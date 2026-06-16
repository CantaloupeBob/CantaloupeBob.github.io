import config from "./assets/config.png";
import lighter from "./assets/lighter.png";
import realizedRes from "./assets/realized-res.png";

export default function PairsBot() {
  return (
    <>
      <p>
        No. In fact, I'm currently sitting at roughly breakeven on unrealized
        PnL and ~+$200 in realized PnL over ~2.5 months. That said, given that I
        have no background in trading or statistics, and that this was my first
        attempt at building a perp bot, im just glad I didn't immediately blow
        it up. (Scroll to the bottom for results and config).
      </p>

      <p>
        Below I'll outline the strategy I'm using, describe principles behind
        it, explain some of the design decisions behind its implementation, and
        describe why I've stopped actively working on it shortly after
        deployment and instead have just been letting it run passively.
      </p>

      <p>
        Rather than betting on direction, this strategy attempts to identify
        temporary price dislocations in the relationship between assets that
        have historically moved together. The goal is not to determine where the
        overall market is headed, but rather whether the relationship between
        two assets have deviated from their historical average, and are likely
        to compress back to their mean. This concept is commonly known as pairs
        trading and is part of the statistical arbitrage family. The core
        concept is straightforward in theory. If two assets have demonstrated a
        stable historical relationship, then significant deviations from that
        relationship may represent temporary inefficiencies rather than
        permanent changes in value. When such deviations occur, a trader can
        look to simultaneously buy the perceived undervalued asset and sell the
        perceived overvalued asset, profiting if the relationship eventually
        returns to normal. The strategy therefore seeks to profit from
        convergence rather than raw appreciation or depreciation of each
        isolated asset.
      </p>

      <h2>Mean Reversion Foundations</h2>

      <p>
        The entire system is built around the concept of mean reversion. Mean
        reversion is the tendency for a variable to return toward its historical
        average after experiencing an unusually large deviation, where one
        challenge is determining whether a divergence actually represents a
        trading opportunity or the beginning of a substantial change in the
        pairs relationship. In an attempt to answer that question, the strategy
        continuously measures how far the relationship has moved from its
        historical norm over a configured time horizon. Rather than comparing
        raw prices, I'm working with logarithmic prices. Using log prices helps
        normalize assets with different price levels and allows their spread to
        be measured in relative terms, making their relationships more
        comparable. The spread is defined as:
      </p>

      <pre>
        <code>spread = log(A) − β · log(B)</code>
      </pre>

      <p>Where:</p>
      <ul>
        <li>A and B represent the two assets being traded.</li>
        <li>β (beta) is the hedge ratio.</li>
        <li>
          The spread represents the relative value relationship between the
          assets.
        </li>
      </ul>

      <p>
        At this stage, there should already be a baked in assumption that this
        spread is mean reverting based on historical movements of the pair.
      </p>

      <h2>Estimating Beta</h2>

      <p>
        One of the most important variables in a pairs trading system is the
        hedge ratio. This is accomplished using OLS regression over a rolling
        historical window. OLS estimates β by measuring how changes in one asset
        have historically been related to changes in the other. For example, if
        OLS estimates a β of 0.5, this implies that Asset A has historically
        moved roughly half as much as Asset B. Rather than constructing the
        spread using equal weights, the model incorporates this relationship
        directly:
      </p>

      <pre>
        <code>spread = log(A) − 0.5 × log(B)</code>
      </pre>

      <p>
        The goal is to remove as much of the shared movement between the assets
        as possible, leaving behind a spread that is more stable and ideally
        more likely to show mean reverting behavior. Markets, however, are not
        static. Because β is recalculated using a rolling window of recent
        observations, the estimate naturally evolves as market conditions
        change. A raw OLS estimate may fluctuate from 0.5 to 0.55 and back to
        0.48 over a short period, even if the underlying relationship has not
        meaningfully changed. To reduce this sensitivity, the model smooths the
        OLS estimate using an EMA. Rather than immediately replacing the
        previously calculated β with each new result, the EMA blends the old
        estimate with the new one, causing β to adapt gradually. For example, if
        the current β is 0.5 and a new OLS calculation produces 0.6, the model
        may only move β part of the way toward the new value on the next
        evaluation. This helps filter out noise while still allowing the ratio
        to respond to real shifts in the pair's relationship.
      </p>

      <p>
        Is there a better way to do this? Almost certainly, but it's the best
        way I read about. Further, the position is not being rebalanced to
        account for β drift once opened, which is a natural place for
        improvement. More on that later.
      </p>

      <h2>Measuring Dislocations with Z-Scores</h2>

      <p>
        Once the spread has been calculated, the next step is determining
        whether it is unusually large. To accomplish this, the strategy converts
        the spread into a Z-score. The Z-score measures how many standard
        deviations a value sits away from its mean.
      </p>

      <pre>
        <code>Z = (spread − μ) / σ</code>
      </pre>

      <p>Where:</p>
      <ul>
        <li>μ is the rolling average spread.</li>
        <li>σ is the rolling standard deviation of the spread.</li>
      </ul>

      <p>
        The Z-score effectively normalizes the spread, making it possible to
        compare deviations across different market regimes. A Z-score of +3, for
        example, indicates that the spread is three standard deviations above
        its average and therefore statistically unusual, while a Z-score of −3
        indicates a significant move in the opposite direction. These extreme
        readings form the basis for trade entry signals.
      </p>

      <h2>Trading the Turn Rather Than the Extreme</h2>

      <p>
        One of the more important design decisions in the strategy is that it
        does not blindly enter positions simply because a spread becomes
        extreme. One of the problems I encountered was that entering a position
        solely because the spread had reached an extreme Z-score could often
        lead to prolonged periods of drawdown, since a significant divergence
        does not necessarily mean the spread has stopped expanding. In practice,
        spreads can remain irrational for much longer than expected before
        eventually reverting, especially if you are simply using a non dynamic
        Z-score to dictate entering a trade. For example, if the strategy was
        configured to enter a trade when the signal Z-score reached ±2.5, there
        is no guarantee that the spread would immediately begin reverting. The
        divergence could continue to widen to ±5 or beyond before reversing
        direction. While the trade may ultimately prove correct if mean
        reversion occurs, the position would first experience a substantial
        unrealized loss, potentially resulting in an extended period of drawdown
        before profitability is realized. Further, these periods of drawdown
        also effectively "lock down" that pair, resulting in opportunity costs
        of re trading it on a favorable entry.
      </p>

      <p>
        For this reason, I attempt to identify the beginning of the reversal
        rather than the maximum deviation itself, though my implementation is
        naive. When the spread reaches its entry Z-score threshold, the system
        looks for "evidence" that reversion has begun before actually entering a
        position. Rather than entering immediately, it waits for the Z-score to
        move back toward the mean after first breaching the threshold. For
        example, if the entry threshold is ±2.5, the strategy may wait for the
        Z-score to first exceed ±2.5 and then pull back to ±2.15 before
        entering. The idea is to avoid entering while the spread is still
        actively expanding and instead wait for at least one tick of reversion
        in an observation. While this helps a bit, it remains a fairly
        rudimentary approach. A single tick of reversion does not necessarily
        signal a turning point, and spreads can easily continue expanding after
        an initial pullback.
      </p>

      <h2>Adaptive Thresholds</h2>

      <p>
        Fixed Z-score thresholds fail to account for changing volatility
        regimes, despite volatility being a key factor in determining whether a
        divergence is meaningful or not. To address this, the strategy uses
        adaptive thresholds. Rather than relying on hardcoded Z-scores, the
        system monitors the recent distribution of Z-scores and derives
        thresholds from percentile values. On every candle close, the new
        Z-score is recorded. Once enough samples have been collected, the entry
        threshold is set to the 80th percentile of the Z-scores observed over a
        lookback window of 500 candles. In practice, this means a pair that has
        been generating Z-scores with a p80 of 1.3 will have an entry threshold
        of 1.3. A pair whose Z-scores regularly hit a p80 of 2.2 will require a
        divergence of 2.2 before a trade is triggered. The idea here is to have
        each pair adjust itself to volatility. If a previously stable pair
        begins behaving more erratically and cray, its Z-score distribution will
        drift upward over subsequent candles, and the entry threshold will rise
        accordingly. The pair becomes harder to trade, automatically, without
        any manual adjustment.
      </p>

      <p>
        The system also measures whether a pair is generating enough movement to
        justify trading at all. Separately from the entry threshold, it checks
        the 90th percentile of recent absolute Z-scores against a minimum
        viability floor. If that p90 falls below that floor, the pair is
        considered dormant and trading is halted. This prevents capital from
        being deployed in relationships that have gone dormant. If the pair
        later resumes normal activity and its p90 climbs back above the floor,
        trading resumes automatically on the next candle close where viability
        is re-evaluated.
      </p>

      <h2>Exiting a Position</h2>

      <p>
        Once a position is open, exit conditions are continuously evaluated. The
        strategy supports three different mechanisms. A hard stop loss, a
        Z-score stop, and a profit target. Each can be enabled or disabled
        depending on the configuration. The stop loss acts as a final line of
        defense. If unrealized losses exceed a predefined dollar amount, the
        position is closed immediately regardless of the spread's behavior. For
        the Z stop, if the spread continues diverging beyond a fixed Z-score
        threshold after entry, the position is closed on the assumption that the
        relationship may be breaking down rather than temporarily dislocating.
        Finally, positions can be closed when a profit target is reached. The
        strategy evaluates returns relative to the actual margin used for the
        pair and exits once a predefined profit threshold has been hit.
      </p>

      <p>
        Originally, I expected Z-score compression to be the most logical exit
        condition, as it aligns closest with the underlying strategy. However,
        because β is fixed at entry and not rebalanced while a position is open,
        a spread returning toward its mean does not necessarily imply the
        position will be in profit. Dynamic β rebalancing was the natural next
        step and would likely have made Z-score compression based exits more
        effective, however, for the reasons outlined below, I chose to hold off
        on implementing it.
      </p>

      <h2>Future Improvements</h2>

      <p>
        The biggest one is dynamic β rebalancing. Right now, β is fixed at
        entry. Intuitively, keeping the hedge ratio updated throughout the life
        of a trade should keep the spread more stable and reduce drawdowns. It
        would also make Z-score compression a much more sensible exit signal.
        The problem is that every rebalance requires trading, which means
        potentially realizing losses on each rebalance, so that begs the
        questions, how much drift should be allowed before warranting a
        rebalance, and what implications do different market regimes have on
        dynamic rebalancing? How would I handle those? Basically, rebalances
        open up another non trivial tree of cases to handle on open positions.
      </p>

      <p>
        Another area worth investigating is the lookback window used to
        calculate β, volatility, and the spread statistics. A longer window
        would likely produce more stable estimates and filter out noise, but it
        could also make the model slower to adapt and potentially filter out
        profitable opportunities. I've also considered realizing losses sooner
        on positions that experience excessive drawdowns. While waiting for
        reversion is the strategy, tying up capital in deeply underwater
        positions isn't ideal. The challenge is finding the right balance. Exit
        too early, and you risk cutting positions that would have eventually
        recovered. Exit too often, and a stream of small realized losses could
        end up being detrimental to performance.
      </p>

      <p>
        Ultimately, this is why I stopped actively tweaking the strategy. Every
        potential improvement could end up being an "unimprovement" instead, and
        since I basically yolo'd this thing into prod without any backtesting,
        any changes I make are effectively just me guessing what might work/be
        better. So why haven't I built a backtesting engine? I have no
        experience building a robust one, and my concern is that a mediocre
        backtesting system could end up doing more harm than good by producing
        misleading results that I then optimize around.
      </p>

      <p>
        As you can see below, over roughly two and a half months with $1,200
        allocated on Lighter, the strategy is approximately breakeven in terms
        of unrealized returns. Interestingly, the chart below reflects
        unrealized PnL based on the account's equity. When looking at realized
        PnL from trades that have actually closed, however, the results are
        decent.
      </p>

      <img src={lighter} alt="Unrealized Pnl over approximately two months" />
      <small>Unrealized Pnl over approximately 2.5 months</small>

      <img src={realizedRes} alt="Realized PNL from closed trades" />
      <small>Realized Pnl from closed trades</small>

      <p>
        Overall, this was a fun experiment. Strategy crafting/thoery aside, the
        actual implementation may have been/is the hardest part. The amount of
        edge cases that need to be handled to keep it running reliably was an
        undertaking of its own. The results lead me to believe I should keep
        iterating, but until I decide to embark on creating a robust and
        effective backtesting engine, passive it shall remain.
      </p>

      <img src={config} alt="Strategy configuration" />
      <small>Example of bot configuration used</small>
    </>
  );
}

import makeroUi from "./assets/makero-ui.jpeg";
import oilStrat from "./assets/oil-strat.jpeg";

export default function Makero() {
  return (
    <>
      <img src={makeroUi} alt="Makero trading interface" />

      <p>
        While there are many ways to approach the market, narrative based
        trading has been one of the most influential frameworks for
        understanding and anticipating price movements, where the meme-ified
        phrase, "monitoring the situation" is turned into a race to profit off
        macro events.
      </p>

      <p>
        Traders who are first to position themselves correctly in an asset tied
        to a correlated event are likely to generate returns. This is nothing
        new, but it's a contributing factor to traders sitting in front of
        monitors, refreshing news & social media sites across their ten plus
        tabs looking to take a position before the market prices in the latest
        alpha. Similarly, algo devs might attempt to build signal engines based
        on aggregated news data, though extracting consistent and reliable
        insights can be a cumbersome process.
      </p>

      <p>
        Enter prediction markets (PMs), which claim to be a "source of truth"
        for the likelihood of an event to take place. The probability of an
        event is derived from the market's order book, which in theory
        incentivizes traders to act on their best information, pushing implied
        probabilities closer to the event's true likelihood. Are PMs always the
        truth machines they claim to be? Probably not, yet as an event nears
        resolution, they tend to be effective at aggregating and pricing new
        information as it emerges, as most participants are attempting to profit
        by correctly forecasting the outcome (market making/advanced strategies
        excluded).
      </p>

      <p>
        Due to this, it's possible to combine perpetual trading with prediction
        markets by using probability based triggers.
      </p>

      <p>Consider this hypothetical:</p>

      <p>
        There exists a PM on whether the Strait of Hormuz will stabilize in ten
        days (the term "stabilize" is vague but sufficient for this example).
        The information coming from the White House as well as the IRGC is
        contradictory and convoluted, so the odds of stability according to the
        PM's order book rests at 50:50.
      </p>

      <p>
        A trader knows that, with such a large volume of oil passing through the
        Strait, disruptions to supply can significantly impact global oil
        prices. One way to profit from this relationship is to react quickly to
        changes in the geopolitical outlook. Using the PM trigger, they can
        automate this process by entering a short oil position when the
        probability of the Strait stabilizing rises above 90%, and a long oil
        position when it falls below 10%. By doing so, the trader looks to
        profit from shifts in the market's view of the geopolitical outlook in
        either direction.
      </p>

      <img src={oilStrat} />
      <small>
        The Strategy Builder. Two coordinated orders triggered by a single
        prediction market condition.
      </small>

      <p>
        The same trigger can also be used to coordinate multiple positions. For
        example, if stabilization becomes more likely, a trader may choose to
        short oil while simultaneously going long equities that are expected to
        benefit from lower energy prices and reduced geopolitical risk.
        Conversely, if the probability of stabilization falls, they may go long
        oil and short those same equities. In this way, a single prediction
        market signal can be used to express a broader macro view across
        multiple markets.
      </p>

      <p>
        If you've made it this far, thanks for reading. This was the inspiration
        for{" "}
        <a href="https://makero.xyz/" target="_blank" rel="noopener noreferrer">
          Makero
        </a>
        .
      </p>
    </>
  );
}

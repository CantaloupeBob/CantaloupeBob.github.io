import video from "./assets/video.mov";

export default function AlloExposure() {
  return (
    <>
      <p>
        <a href="https://kinetiq.xyz">Kinetiq</a> offers a suite of products
        that support the growth and sustainability of the Hyperliquid ecosystem
        through integrations with both the HyperEvm and HyperCore.
      </p>

      <video src={video} controls playsInline />

      <p>
        Many of Kinetiq's products have their own associated token, and as a
        result, gaining exposure across the entire ecosystem requires executing
        multiple swaps and transactions. While this isn't a major inconvenience,
        it can feel cumbersome.
      </p>

      <p>
        I made this tool to simplify that process. Users can specify a single
        input token and a set of ouput tokens, along with their desired exposure
        to each, and the app bundles the transactions into one. Additionally,
        because HYPE can be staked into kHYPE and KNTQ can be staked into sKNTQ,
        users have the option to stake a portion of their allocation instead of
        swapping directly into the liquid token.
      </p>

      <p>
        This isn't a complex or particularly useful thing, but its something I
        wanted to use and so I built it anyway.
      </p>

      <p>
        While the contract is stateless and minimal, it is not audited so use at
        your own risk.
      </p>
      <p>
        The code for both the{" "}
        <a href="https://github.com/CantaloupeBob/alloexposure">frontend</a> and{" "}
        <a href="https://github.com/CantaloupeBob/allo_exposure">contract</a> is
        public.
      </p>
    </>
  );
}

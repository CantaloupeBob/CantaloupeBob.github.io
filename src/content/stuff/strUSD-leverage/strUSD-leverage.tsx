import video from "./assets/strUSD_lev_demo.mp4";

export default function AlloExposure() {
  return (
    <>
      <p>
        <a href="https://www.tori.finance/">Tori Finance</a> provides a
        synthetic dollar (trUSD) backed by a basket of risk neutral positions,
        with any yield generated from these positions flowing to trUSD stakers.
      </p>

      <video src={video} controls playsInline />

      <p>
        To amplify exposure to the yield received by these staked positions,
        represented as strUSD, I created this one click flashloan handler that
        enables users to loop their strUSD position in a single transaction
        using Morpho flashloans and Curve swaps.
      </p>

      <p>
        While the contract is minimal, it is not audited so use at your own
        risk.
      </p>
      <p>
        The code for both the{" "}
        <a href="https://github.com/CantaloupeBob/strUSD-leverage-ui">
          frontend
        </a>{" "}
        and{" "}
        <a href="https://github.com/CantaloupeBob/morpho_flash_leverage">
          contract
        </a>{" "}
        is public.
      </p>
    </>
  );
}

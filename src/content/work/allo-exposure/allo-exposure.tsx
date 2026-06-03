import video from "./assets/video.mov";

export default function AlloExposure() {
  return (
    <>
      <video src={video} controls playsInline />

      <p>
        Opening paragraph. Set the scene quickly — what is this, and why did you
        build it?
      </p>

      <h2>Background</h2>

      <p>
        Some context that helps the reader understand the scope of the work.
        Where did this come from? Was it a client project, a personal project,
        something in between?
      </p>

      <h2>What Was Built</h2>

      <p>
        The concrete description of what you made. Be specific. Generalities are
        less interesting than details.
      </p>

      <h3>A sub-section if you need one</h3>

      <p>
        Use h3 for finer-grained breakdowns within a section. These render as
        small all-caps labels, keeping the visual weight low while still
        providing structure for the reader.
      </p>

      <h2>Reflection</h2>

      <p>
        What did this teach you? Would you make the same choices again? Honest
        reflection is more interesting than a polished success story.
      </p>
    </>
  );
}

import { useRef, useState } from "react";
import { useRafScroll } from "../hooks";
import Reveal from "./Reveal";

const TEXT = "Every piece is stitched, knotted and woven by hand — made slowly, paid fairly and designed to be loved for decades.";
const WORDS = TEXT.split(" ");

/** Words light up one by one as the paragraph scrolls through the screen. */
export default function Manifesto() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useRafScroll(() => {
    const r = ref.current.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .8 - r.top) / (r.height + innerHeight * .25)));
    setLit(Math.round(p * WORDS.length * 1.15));
  });

  return (
    <section className="manifesto wrap">
      <Reveal as="p" className="tag">notre engagement</Reveal>
      <p className="reveal-words" ref={ref}>
        {WORDS.map((w, i) => <span key={i}><span className={`w${i < lit ? " lit" : ""}`}>{w}</span>{" "}</span>)}
      </p>
      <Reveal as="ul" className="values"><li>artisanat</li><li>unique</li><li>antique</li></Reveal>
    </section>
  );
}

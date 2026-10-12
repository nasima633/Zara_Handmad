import { useEffect, useRef, useState } from "react";
import { asset } from "../data/catalog";
import Reveal from "./Reveal";

const STEPS = [
  ["001", "Sourcing", "Afghan_Carpet (2).jpeg", "We work directly with weaving families across Afghanistan, selecting wool, silk and dyes with care for quality and origin."],
  ["002", "Embroidery", "w5.webp", "Mirror-work, coin and thread embroidery is stitched by hand — a single Kuchi dress can take weeks to complete."],
  ["003", "Weaving", "Afghan_Carpet (7).jpeg", "Carpets and shawls are knotted on traditional looms, every pattern passed down through generations."],
  ["004", "Delivery", "Afghan_Carpet (8).jpeg", "Each order is checked, packed with care and shipped tracked and insured, free over $250."]
];

/** Numbered accordion; the photo cross-fades to match the open step. */
export default function Craft() {
  const [open, setOpen] = useState(0);
  const [photo, setPhoto] = useState(STEPS[0][2]);
  const [fade, setFade] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const toggle = i => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next >= 0) {
      setFade(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => { setPhoto(STEPS[next][2]); setFade(false); }, 250);
    }
  };

  return (
    <section className="section" id="craft">
      <div className="wrap craft">
        <Reveal className="craft-side">
          <p className="tag">Our Expertise Across 4 Domains</p>
          <h2>Our<br /><em>Heritage Craftsmanship</em></h2>
          <div className="craft-img"><img src={asset(photo)} style={{ opacity: fade ? 0 : 1 }} alt="Artisan hands at work" loading="lazy" /></div>
        </Reveal>
        <ul className="acc">
          {STEPS.map(([n, title, , text], i) => (
            <li key={n} className={open === i ? "open" : ""}>
              <button aria-expanded={open === i} onClick={() => toggle(i)}><small>{n}</small><h3>{title}</h3><i>+</i></button>
              <div><p>{text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { asset } from "../data/catalog";
import Reveal from "./Reveal";

const SHOTS = [
  ["w1.jpg", "Kuchi dress on a carpet", -0.08],
  ["Afghan_Carpet (3).jpeg", "Red Afghan carpet", 0.1],
  ["p1.jpeg", "Embroidered waistcoat", -0.05],
  ["w6.jpg", "Fuchsia flare dress", 0.12]
];

export default function Gallery() {
  return (
    <section className="gallery wrap" aria-label="Studio gallery">
      {SHOTS.map(([file, alt, speed]) => (
        <Reveal as="figure" key={file} parallax={speed}><img src={asset(file)} alt={alt} loading="lazy" /></Reveal>
      ))}
    </section>
  );
}

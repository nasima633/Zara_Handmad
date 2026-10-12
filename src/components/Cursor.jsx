import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReduced } from "../hooks";

/** Custom cursor (mouse only). Elements with data-cursor="label" show a text bubble. */
export default function Cursor() {
  const root = useRef(null), dot = useRef(null), ring = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReduced()) return;
    document.body.classList.add("has-cursor");
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => { mx = e.clientX; my = e.clientY; dot.current.style.transform = `translate(${mx}px,${my}px)`; };
    const loop = () => { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.current.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    const over = e => {
      const lab = e.target.closest("[data-cursor]"), hov = e.target.closest("a, button, input, select");
      root.current.classList.toggle("label", !!lab);
      root.current.classList.toggle("hover", !!hov && !lab);
      ring.current.textContent = lab ? lab.dataset.cursor : "";
    };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.body.classList.remove("has-cursor"); };
  }, []);

  return <div className="cursor" ref={root} aria-hidden="true"><i ref={dot} /><span ref={ring} /></div>;
}

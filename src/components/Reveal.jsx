import { useEffect, useRef, useState } from "react";
import { prefersReduced, useMagnetic, useRafScroll } from "../hooks";

/** Fades/slides its children in when scrolled into view. Optional `parallax` speed and `magnetic` hover drift. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, parallax, magnetic = false, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: .12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useRafScroll(() => {
    if (parallax == null || prefersReduced()) return;
    const el = ref.current, r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    el.style.transform = `translate3d(0,${((r.top + r.height / 2 - innerHeight / 2) * parallax).toFixed(1)}px,0)`;
  });

  useMagnetic(ref, magnetic);

  return <Tag ref={ref} className={`${className} rv${shown ? " in" : ""}`} style={{ "--d": `${delay}s` }} {...rest}>{children}</Tag>;
}

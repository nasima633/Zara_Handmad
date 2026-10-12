import { useRef } from "react";
import { useRafScroll } from "../hooks";

export default function ScrollProgress() {
  const ref = useRef(null);
  useRafScroll(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  });
  return <div className="progress" ref={ref} />;
}

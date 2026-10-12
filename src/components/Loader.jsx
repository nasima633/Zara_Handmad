import { useEffect, useState } from "react";
import { prefersReduced } from "../hooks";

/** Counter loader; adds `ready` to <body> when finished so the hero can animate in. */
export default function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReduced()) { document.body.classList.add("ready"); setGone(true); return; }
    let value = 0, finished = false;
    const finish = () => {
      if (finished) return; finished = true;
      setDone(true);
      setTimeout(() => document.body.classList.add("ready"), 350);
      setTimeout(() => setGone(true), 1400);
    };
    const t = setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 9));
      setN(value);
      if (value >= 100) { clearInterval(t); setTimeout(finish, 200); }
    }, 45);
    const failsafe = setTimeout(() => { clearInterval(t); finish(); }, 3200);
    return () => { clearInterval(t); clearTimeout(failsafe); };
  }, []);

  if (gone) return null;
  return <div className={`loader${done ? " done" : ""}`} aria-hidden="true"><span>Zara Handmade</span><b>{n}</b></div>;
}

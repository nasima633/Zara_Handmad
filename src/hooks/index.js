import { useEffect, useRef, useState } from "react";

export const prefersReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = () => matchMedia("(pointer: fine)").matches;

/** Run `cb` on scroll/resize, throttled to one call per animation frame. */
export function useRafScroll(cb) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    let queued = false;
    const run = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; ref.current(); }); } };
    addEventListener("scroll", run, { passive: true });
    addEventListener("resize", run);
    ref.current();
    return () => { removeEventListener("scroll", run); removeEventListener("resize", run); };
  }, []);
}

/** Buttons/links drift toward the mouse (mouse devices only). */
export function useMagnetic(external, enabled = true) {
  const own = useRef(null);
  const ref = external || own;
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !hasFinePointer() || prefersReduced()) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [ref, enabled]);
  return ref;
}

/** Focus trap + Escape + focus restore for drawers and dialogs. */
export function useDialog(open, containerRef, onClose) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    const previous = document.activeElement;
    const focusables = () => [...el.querySelectorAll("button, input, a[href], select")].filter(b => !b.disabled && b.getClientRects().length);
    focusables()[0]?.focus();
    const onKey = e => {
      if (e.key === "Escape") return close.current();
      if (e.key !== "Tab") return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); previous?.focus?.(); };
  }, [open, containerRef]);
}

const MON = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const stamp = () => {
  const d = new Date();
  return { date: `${d.getDate()}${MON[d.getMonth()]}${d.getFullYear()}`, time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` };
};
/** PO-style live date, e.g. "9oct2026". */
export function useLiveDate() {
  const [now, setNow] = useState(stamp);
  useEffect(() => { const t = setInterval(() => setNow(stamp()), 20000); return () => clearInterval(t); }, []);
  return now;
}

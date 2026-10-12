import { useRef, useState } from "react";
import { CATS, DESC, TAGS, asset, countIn } from "../data/catalog";
import { useShop } from "../context/ShopContext";
import Reveal from "./Reveal";

/** Carousel of category cards; the active card's details sit between the ← → buttons. */
export default function Categories() {
  const { goShop } = useShop();
  const [cur, setCur] = useState(0);
  const cards = useRef([]);
  const trackEl = useRef(null);
  const raf = useRef();
  const last = CATS.length - 1;

  const go = i => cards.current[Math.max(0, Math.min(last, i))]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const m = trackEl.current.getBoundingClientRect(), mid = m.left + m.width / 2;
      let best = 0, d = Infinity;
      cards.current.forEach((c, k) => { const r = c.getBoundingClientRect(), dd = Math.abs(r.left + r.width / 2 - mid); if (dd < d) { d = dd; best = k; } });
      setCur(best);
    });
  };
  const activate = e => { const c = e.target.closest(".car-card"); if (c) setCur(+c.dataset.i); };
  const onKey = e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const c = e.target.closest(".car-card"); if (!c) return;
    e.preventDefault(); goShop(c.dataset.cat);
  };

  const c = CATS[cur];
  return (
    <section className="section" id="categories">
      <Reveal className="wrap head">
        <h2><small>(05)</small>Categories</h2>
        <p>Make Sure ourself by hovering the products to get more detals, or use the arrows to browse.</p>
      </Reveal>

      <div className="car-track" ref={trackEl} aria-label="Product categories" onScroll={onScroll}
        onMouseOver={activate} onFocus={activate} onKeyDown={onKey}
        onClick={e => { const k = e.target.closest(".car-card"); if (k) goShop(k.dataset.cat); }}>
        {CATS.map((cat, i) => (
          <article key={cat.id} ref={el => (cards.current[i] = el)} className={`car-card${i === cur ? " active" : ""}`}
            data-i={i} data-cat={cat.id} tabIndex={0} role="button" aria-label={`Shop ${cat.name}`} data-cursor="shop">
            <img src={asset(cat.cover)} alt="" loading="lazy" /><span className="num">00{i + 1}</span>
          </article>
        ))}
      </div>

      <div className="car-ctrl wrap">
        <button className="arrow" id="prev" aria-label="Previous category" disabled={cur === 0} onClick={() => go(cur - 1)}>←</button>
        <div className="detail swap" key={cur} aria-live="polite">
          <small>00{cur + 1} / 00{CATS.length}</small>
          <h3>{c.name}</h3>
          <p>{DESC[c.id]}</p>
          <ul className="tags">{TAGS[c.id].map(t => <li key={t}>{t}</li>)}<li>{countIn(c.id)} pieces</li></ul>
          <a className="link" href="#shop" onClick={e => { e.preventDefault(); goShop(c.id); }}>Shop this category →</a>
        </div>
        <button className="arrow" id="next" aria-label="Next category" disabled={cur === last} onClick={() => go(cur + 1)}>→</button>
      </div>
    </section>
  );
}

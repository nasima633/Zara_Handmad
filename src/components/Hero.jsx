import { useRef } from "react";
import { asset } from "../data/catalog";
import { prefersReduced, useLiveDate, useRafScroll } from "../hooks";

const MARQUEE = [["Handmade", false], ["Afghan craft", true], ["Full of heritage", false], ["Made to be treasured", true]];

export default function Hero() {
  const media = useRef(null), content = useRef(null);
  const { date, time } = useLiveDate();

  /* image rises faster than the page; text lags behind */
  useRafScroll(() => {
    if (prefersReduced() || scrollY > innerHeight * 1.2) return;
    media.current.style.transform = `translate3d(0,${(-scrollY * .32).toFixed(1)}px,0)`;
    content.current.style.transform = `translate3d(0,${(scrollY * .12).toFixed(1)}px,0)`;
  });

  return (
    <section className="hero" id="home">
      <div className="hero-media" ref={media}><img src={asset("hero.jpeg")} alt="" fetchPriority="high" /></div>
      <div className="hero-shade" />
      <div className="hero-content wrap" ref={content}>
        {/* <p className="kicker">maison d'artisanat afghan · depuis 2016</p> */}
        <h1>Handmade pieces, <em>beautifully</em> crafted by Afghan artisans.</h1>
        <p className="hero-sub">Embroidered dresses, woven carpets, shawls and accessories — made slowly by hand and designed for modern living.</p>
        {/* <div className="cta"><a className="btn btn-light" href="#categories">Explore the collection</a><a className="btn btn-line" href="#craft">Our savoir-faire</a></div> */}
      </div>
      <div className="hero-bottom">
        <div className="hero-marquee" aria-hidden="true">
          <div className="mtrack">
            {[0, 1].flatMap(r => MARQUEE.map(([t, out]) => <span key={`${r}-${t}`} className={out ? "out" : undefined}>{t} <i>✦</i></span>))}
          </div>
        </div>
        <div className="hero-meta wrap">
          <span className="date">{date} · {time}</span>
          <span>all rights reserved © 2026 <b>Zara Handmade</b></span>
          <span className="scroll-cue">scroll ↓</span>
        </div>
      </div>
    </section>
  );
}

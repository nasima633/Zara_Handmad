import { useEffect, useRef, useState } from "react";
import { asset } from "../data/catalog";
import { prefersReduced } from "../hooks";
import Reveal from "./Reveal";

/** Autoplaying muted showreel: click to pause/play, pauses when off-screen. */
export default function Reel() {
  const video = useRef(null);
  const userPaused = useRef(prefersReduced());
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = video.current;
    v.muted = true;                                  // React doesn't reflect the muted prop reliably
    const play = () => { if (!userPaused.current) v.play().catch(() => {}); };
    const sync = () => setPaused(v.paused);
    v.addEventListener("play", sync); v.addEventListener("pause", sync); v.addEventListener("canplay", play);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: .2 });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener("play", sync); v.removeEventListener("pause", sync); v.removeEventListener("canplay", play); };
  }, []);

  const toggle = () => {
    const v = video.current;
    userPaused.current = !v.paused;
    v.paused ? v.play().catch(() => {}) : v.pause();
  };

  return (
    <section className="reel" id="reel">
      <Reveal className="wrap head"><h2><small>(reel)</small>Showreel</h2><p>Our latest weaving &amp; embroidery in motion.</p></Reveal>
      <div className="reel-box" data-cursor={paused ? "play" : "pause"} onClick={toggle}>
        <video ref={video} autoPlay muted loop playsInline preload="auto" poster={asset("video-poster.jpg")} aria-label="Artisans weaving an Afghan carpet">
          <source src={asset("video-h264.mp4")} type='video/mp4; codecs="avc1.640028"' />
          <source src={asset("video.webm")} type="video/webm" />
        </video>
        <span className="reel-label">{paused ? "play" : "pause"}</span>
      </div>
    </section>
  );
}

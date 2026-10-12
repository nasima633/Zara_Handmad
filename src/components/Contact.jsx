import { useState } from "react";
import { useLiveDate, useMagnetic } from "../hooks";
import Reveal from "./Reveal";

export default function Contact() {
  const { date } = useLiveDate();
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ msg: "", ok: null });
  const topRef = useMagnetic();

  const submit = e => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState({ ok, msg: ok ? "Thank you — you're on the list! 🎉" : "Please enter a valid email address." });
    if (ok) setEmail("");
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal as="p" className="tag">nous contacter</Reveal>
        <Reveal as="a" className="mail" magnetic href="mailto:hello@zarahandmade.com" data-cursor="write">hello@<br />zarahandmade.com</Reveal>
        <Reveal className="cols">
          <div><h4>adresse</h4><p>Zara Handmade<br />Kabul · Paris · Frankfurt</p></div>
          <div><h4>contact</h4><p>hello@zarahandmade.com<br />+49 69 000 000</p></div>
          <div><h4>social</h4><p><a href="#">Instagram</a> · <a href="#">Pinterest</a></p></div>
          <form className="news" onSubmit={submit} noValidate>
            <h4>newsletter</h4>
            <div>
              <input type="email" placeholder="your@email.com" aria-label="Email address" required value={email}
                aria-invalid={state.ok === false} onChange={e => setEmail(e.target.value)} />
              <button className="btn btn-sm" type="submit">join</button>
            </div>
            <small id="newsMsg" className={state.ok == null ? "" : state.ok ? "ok" : "err"} aria-live="polite">{state.msg}</small>
          </form>
        </Reveal>
        <div className="foot">
          <span>all rights reserved © 2026 <b>Zara Handmade</b></span>
          <span className="date">{date}</span>
          <a href="#home" ref={topRef}>back to top ↑</a>
        </div>
      </div>
    </section>
  );
}

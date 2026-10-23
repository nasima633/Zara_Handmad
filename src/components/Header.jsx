import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useRafScroll } from "../hooks";

const NAV = [["home", "home"], ["categories", "categories"], ["shop", "shop"], ["craft", "Heritage"], ["contact", "contact"]];

export default function Header({ menuOpen, setMenuOpen }) {
  const { wish, savedOnly, toggleSaved, cartCount, openCart } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  /* active link follows the section in the middle of the screen */
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  useRafScroll(() => {
    setScrolled(scrollY > 80);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0 && scrollY >= max - 6) setActive("contact");
  });

  /* close the mobile menu on Escape or when the window grows */
  useEffect(() => {
    const key = e => e.key === "Escape" && setMenuOpen(false);
    const size = () => innerWidth > 900 && setMenuOpen(false);
    addEventListener("keydown", key); addEventListener("resize", size);
    return () => { removeEventListener("keydown", key); removeEventListener("resize", size); };
  }, [setMenuOpen]);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <a className="logo" href="#home" aria-label="Zara Handmade — home">zara<em>handmade</em></a>
      <nav className={`nav${menuOpen ? " open" : ""}`} id="nav" aria-label="Main" onClick={e => e.target.closest("a") && setMenuOpen(false)}>
        {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{label}</a>)}
      </nav>
      <div className="actions">
        <button className="pill-btn" aria-pressed={savedOnly} aria-label="Saved items" onClick={toggleSaved}>saved <i>{wish.size}</i></button>
        <button className="pill-btn" aria-label="Open bag" onClick={openCart}>bag <i>{cartCount}</i></button>
          <a
    className="pill-btn"
    href="https://forms.gle/coYid7rTkbpS1FjQ6"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open automation form"
  >
   place an order
  </a>
        <button className="burger" aria-expanded={menuOpen} aria-controls="nav" onClick={() => setMenuOpen(o => !o)}><span>{menuOpen ? "close" : "menu"}</span></button>
      </div>
    </header>
  );
}

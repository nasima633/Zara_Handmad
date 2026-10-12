import { useEffect, useState } from "react";
import { useShop } from "./context/ShopContext";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Categories from "./components/Categories";
import Shop from "./components/Shop";
import Reel from "./components/Reel";
import Craft from "./components/Craft";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import CartDrawer from "./components/CartDrawer";
import QuickView from "./components/QuickView";
import Toast from "./components/Toast";

export default function App() {
  const { drawerOpen, qvId } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  /* one place decides when the page behind an overlay must not scroll */
  useEffect(() => {
    document.body.classList.toggle("lock", drawerOpen || qvId != null || menuOpen);
    document.body.classList.toggle("menu-open", menuOpen);
  }, [drawerOpen, qvId, menuOpen]);

  return (
    <>
      <Loader />
      <ScrollProgress />
      <Cursor />
      <a className="skip" href="#shop">Skip to products</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Manifesto />
        <Categories />
        <Shop />
        <Reel />
        <Craft />
        <Gallery />
        <Contact />
      </main>
      <CartDrawer />
      <QuickView />
      <Toast />
    </>
  );
}

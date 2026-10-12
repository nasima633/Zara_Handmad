import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PAGE, PRODUCTS, PRODUCT_MAP } from "../data/catalog";

const ShopContext = createContext(null);
export const useShop = () => useContext(ShopContext);

const KEY = "zara-v5"; // same key as the HTML version, so saved bags carry over
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export function ShopProvider({ children }) {
  const saved = useMemo(load, []);

  /* persistent state */
  const [cart, setCart] = useState(saved.cart || []);
  const [wish, setWish] = useState(() => new Set(saved.wish || []));
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ cart, wish: [...wish] })); } catch { /* storage unavailable */ }
  }, [cart, wish]);

  /* catalogue controls */
  const [filter, setFilterRaw] = useState("all");
  const [query, setQueryRaw] = useState("");
  const [sort, setSort] = useState("featured");
  const [shown, setShown] = useState(PAGE);
  const [savedOnly, setSavedOnly] = useState(false);

  /* UI state */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qvId, setQvId] = useState(null);
  const [toastMsg, setToastMsg] = useState({ text: "", n: 0 });
  const timer = useRef();

  const showToast = useCallback(text => {
    setToastMsg(t => ({ text, n: t.n + 1 }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(t => ({ ...t, text: "" })), 2200);
  }, []);

  /* derived: filtered + sorted list */
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = PRODUCTS.filter(p =>
      (filter === "all" || p.cat === filter) &&
      (!savedOnly || wish.has(p.id)) &&
      (!q || (p.name + " " + p.catName).toLowerCase().includes(q)));
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [filter, query, sort, savedOnly, wish]);

  const setFilter = useCallback(id => { setFilterRaw(id); setShown(PAGE); }, []);
  const setQuery = useCallback(v => { setQueryRaw(v); setShown(PAGE); }, []);
  const scrollToShop = () => document.getElementById("shop")?.scrollIntoView();
  const goShop = useCallback(id => { setFilter(id); scrollToShop(); }, [setFilter]);

  /* "Show more" becomes "Show less" once everything is visible */
  const toggleMore = useCallback(() => {
    if (shown >= list.length) { setShown(PAGE); scrollToShop(); } else setShown(s => s + PAGE);
  }, [shown, list.length]);

  const toggleWish = useCallback(id => {
    setWish(w => { const n = new Set(w); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const toggleSaved = useCallback(() => {
    if (!wish.size && !savedOnly) return showToast("Tap the heart on any piece to save it.");
    setSavedOnly(s => !s); setFilterRaw("all"); scrollToShop();
    showToast(savedOnly ? "Showing everything" : "Showing saved pieces");
  }, [wish.size, savedOnly, showToast]);

  /* cart */
  const addToCart = useCallback(id => {
    setCart(c => c.some(l => l.id === id) ? c.map(l => l.id === id ? { ...l, qty: l.qty + 1 } : l) : [...c, { id, qty: 1 }]);
    showToast("Added to your bag ✓");
  }, [showToast]);
  const changeQty = useCallback((id, d) => {
    setCart(c => c.map(l => l.id === id ? { ...l, qty: l.qty + d } : l).filter(l => l.qty > 0));
  }, []);
  const removeLine = useCallback(id => setCart(c => c.filter(l => l.id !== id)), []);

  const items = useMemo(() => cart.map(l => ({ ...l, p: PRODUCT_MAP[l.id] })).filter(l => l.p), [cart]);
  const total = items.reduce((s, l) => s + l.p.price * l.qty, 0);
  const cartCount = items.reduce((s, l) => s + l.qty, 0);

  const value = {
    list, shown, filter, setFilter, query, setQuery, sort, setSort, toggleMore, goShop,
    wish, toggleWish, savedOnly, toggleSaved,
    items, total, cartCount, addToCart, changeQty, removeLine,
    drawerOpen, openCart: () => setDrawerOpen(true), closeCart: () => setDrawerOpen(false),
    qvId, openQV: setQvId, closeQV: () => setQvId(null),
    toast: toastMsg, showToast
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

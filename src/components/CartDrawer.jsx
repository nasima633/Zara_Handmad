import { useRef } from "react";
import { FREE_SHIP, money } from "../data/catalog";
import { useShop } from "../context/ShopContext";
import { useDialog } from "../hooks";

export default function CartDrawer() {
  const { drawerOpen, closeCart, items, total, changeQty, removeLine, showToast } = useShop();
  const ref = useRef(null);
  useDialog(drawerOpen, ref, closeCart);

  const left = FREE_SHIP - total;
  const shipText = !items.length ? `Free shipping over ${money(FREE_SHIP)}` : left > 0 ? `You're ${money(left)} away from free shipping` : "🎉 You've unlocked free shipping!";

  return (
    <>
      <div className="scrim" hidden={!drawerOpen} onClick={closeCart} />
      <aside className={`drawer${drawerOpen ? " open" : ""}`} ref={ref} role="dialog" aria-modal="true" aria-label="Shopping bag" aria-hidden={!drawerOpen}>
        <header><h2>Your bag</h2><button className="pill-btn" aria-label="Close bag" onClick={closeCart}>close ×</button></header>
        <p className="ship">{shipText}</p>
        <div className="ship-bar"><i style={{ width: `${Math.min(100, total / FREE_SHIP * 100)}%` }} /></div>
        <div className="lines">
          {items.length ? items.map(({ p, qty }) => (
            <div className="line" key={p.id}>
              <img src={p.image} alt="" />
              <div>
                <strong>{p.name}</strong><small>{money(p.price)}</small>
                <div className="qty">
                  <button aria-label="Decrease quantity" onClick={() => changeQty(p.id, -1)}>−</button>
                  <span>{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => changeQty(p.id, 1)}>+</button>
                </div>
              </div>
              <button className="rm" aria-label={`Remove ${p.name}`} onClick={() => removeLine(p.id)}>Remove</button>
            </div>
          )) : <p className="empty">Your bag is empty.<br />Find something you love ✨</p>}
        </div>
        <footer>
          <div className="total"><span>Total</span><b>{money(total)}</b></div>
          <button className="btn block" onClick={() => showToast(items.length ? "Checkout is a demo in this build." : "Your bag is empty.")}>Checkout</button>
        </footer>
      </aside>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { DESC, FREE_SHIP, PRODUCT_MAP, money } from "../data/catalog";
import { useShop } from "../context/ShopContext";
import { useDialog } from "../hooks";

export default function QuickView() {
  const { qvId, closeQV, addToCart, wish, toggleWish } = useShop();
  const box = useRef(null);
  const lastId = useRef(null);
  const [photo, setPhoto] = useState(0);
  const open = qvId != null;
  if (open) lastId.current = qvId;               // keep content while the modal fades out
  const p = PRODUCT_MAP[lastId.current];

  useEffect(() => { setPhoto(0); }, [qvId]);
  useDialog(open, box, closeQV);

  const liked = p && wish.has(p.id);
  const photos = p ? [p.image, p.image2] : [];

  return (
    <div className={`modal${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Quick view" aria-hidden={!open}
      onClick={e => e.target === e.currentTarget && closeQV()}>
      <div className="qv-box" ref={box}>
        <button className="pill-btn qv-close" aria-label="Close quick view" onClick={closeQV}>close ×</button>
        {p && (
          <div className="qv-grid">
            <div className="qv-gal">
              <img className="qv-main" src={photos[photo]} alt={p.name} />
              <div className="qv-th">
                {photos.map((src, i) => <button key={i} className={photo === i ? "on" : ""} aria-label={`Show photo ${i + 1}`} onClick={() => setPhoto(i)}><img src={src} alt="" /></button>)}
              </div>
            </div>
            <div className="qv-info">
              <span className="cn">{p.catName} · {p.status}</span>
              <h2>{p.name}</h2>
              <p className="qv-price">{money(p.price)}</p>
              <p>{DESC[p.cat]} Each piece is unique — small variations in pattern and colour are part of its character.</p>
              <ul><li>Handmade by Afghan artisans</li><li>Free shipping over {money(FREE_SHIP)}</li><li>30-day easy returns</li></ul>
              <div className="qv-actions">
                <button className="btn" onClick={() => { addToCart(p.id); closeQV(); }}>Add to bag</button>
                <button className="heart" aria-pressed={liked} aria-label={`Save ${p.name}`} onClick={() => toggleWish(p.id)}>{liked ? "♥" : "♡"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

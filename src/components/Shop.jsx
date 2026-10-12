import { memo } from "react";
import { CATS, money } from "../data/catalog";
import { useShop } from "../context/ShopContext";
import { useMagnetic } from "../hooks";
import Reveal from "./Reveal";

const TABS = [{ id: "all", name: "All" }, ...CATS];

/** Hover the photo: second image fades in, badge hides, only "Quick view" shows (see CSS). */
const ProductCard = memo(function ProductCard({ p, liked, onAdd, onHeart, onQuick }) {
  return (
    <article className="card" data-cat={p.cat}>
      <div className="media" onClick={() => onQuick(p.id)}>
        <img className="i1" src={p.image} alt={p.name} loading="lazy" width="320" height="400" />
        <img className="i2" src={p.image2} alt="" loading="lazy" width="320" height="400" />
        <span className="badge">{p.status}</span>
        <button className="qv" aria-label={`Quick view ${p.name}`} onClick={e => { e.stopPropagation(); onQuick(p.id); }}>Quick view</button>
      </div>
      <div className="info">
        <div><span className="cn">{p.catName}</span><h3>{p.name}</h3></div>
        <span className="price">{money(p.price)}</span>
      </div>
      <div className="row">
        <button className="add" onClick={() => onAdd(p.id)}>Add to bag</button>
        <button className="heart" aria-pressed={liked} aria-label={`${liked ? "Remove" : "Save"} ${p.name} ${liked ? "from" : "to"} saved`} onClick={() => onHeart(p.id)}>{liked ? "♥" : "♡"}</button>
      </div>
    </article>
  );
});

export default function Shop() {
  const { list, shown, filter, setFilter, query, setQuery, sort, setSort, toggleMore, wish, toggleWish, addToCart, openQV } = useShop();
  const part = list.slice(0, shown);
  const all = part.length >= list.length;
  const moreRef = useMagnetic();

  return (
    <section className="section alt" id="shop">
      <div className="wrap">
        <Reveal className="head"><h2><small>(50)</small>The collection</h2><p>Handmade, one piece at a time.</p></Reveal>

        <div className="toolbar">
          <div className="tabs" role="tablist" aria-label="Filter products">
            {TABS.map(t => <button key={t.id} className="tab" role="tab" aria-selected={filter === t.id} onClick={() => setFilter(t.id)}>{t.name}</button>)}
          </div>
          <div className="tools">
            <input type="search" placeholder="Search…" aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} />
            <select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option><option value="low">Price ↑</option><option value="high">Price ↓</option>
            </select>
          </div>
        </div>

        <p className="meta" aria-live="polite">Showing {part.length} of {list.length} products</p>
        <div className="grid">
          {part.length
            ? part.map(p => <ProductCard key={p.id} p={p} liked={wish.has(p.id)} onAdd={addToCart} onHeart={toggleWish} onQuick={openQV} />)
            : <p className="empty">No products found. Try another search or category.</p>}
        </div>
        <div className="more">
          <button className="btn" ref={moreRef} hidden={list.length <= 8} aria-expanded={all} onClick={toggleMore}>{all ? "Show less" : "Show more"}</button>
        </div>
      </div>
    </section>
  );
}

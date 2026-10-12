/* Catalog data — edit categories, names and photos here (images repeat per category on purpose). */

export const FREE_SHIP = 250;
export const PAGE = 8;

/** Build a URL for a file in /public/assets (works with any Vite base path). */
export const asset = f => `${import.meta.env.BASE_URL}assets/${encodeURI(f)}`;
export const money = n => "$" + n.toLocaleString("en-US");

export const CATS = [
  { id: "women", name: "Women's Clothing", color: "#E0306E", cover: "w9.png",
    images: ["w1.jpg", "w2.webp", "w7.png", "w4.avif", "w5.webp", "w6.jpg", "w8.avif"],
    names: ["Kuchi Festival Gown", "Fuchsia Embroidered Frock", "Emerald Mirror-Work Dress", "Sunset Tribal Ensemble", "Rose Silk Flare Dress", "Royal Violet Dress", "Ruby Velvet Gown", "Bridal Mirror Dress", "Marigold Kuchi Frock", "Jade Heritage Dress"], base: 96 },
  { id: "men", name: "Men's Clothing", color: "#0E7C7B", cover: "m3.png",
    images: ["Men_cloths (6).jpeg", "Men_cloths (2).jpeg", "p1.jpeg", "Men_cloths (8).jpeg", "Men_cloths (5).jpeg", "Men_cloths (4).jpeg", "p2.jpeg"],
    names: ["Heritage Waistcoat", "Cotton Kurta Set", "Embroidered Kurta", "Classic Collar Shirt", "Ceremony Set", "White Perahan Tunban", "Indigo Embroidered Vest", "Sandstone Kurta", "Festive Silk Kurta", "Artisan Blazer"], base: 58 },
  { id: "shawls", name: "Shawls, Hats & Bags", color: "#E8590C", cover: "shawal.png",
    images: ["shawal.png", "Afghan_Shawl&Patoo_Bag (1).jpeg", "bag.png", "Afghan_Shawl&Patoo_Bag (10).jpeg", "Afghan_Shawl&Patoo_Bag (4).jpeg"],
    names: ["Kabul Garden Shawl", "Handwoven Wool Shawl", "Artisan Tote Bag", "Pashmina Patoo Set", "Handmade Pakol Hats", "Embroidered Patoo", "Heritage Shoulder Bag", "Winter Wool Wrap", "Woven Market Tote", "Classic Pakol"], base: 38 },
  { id: "accessories", name: "Accessories", color: "#7A3FD1", cover: "Afghan_Acceossries (5).jpeg",
    images: ["Afghan_Acceossries (7).jpeg", "Afghan_Acceossries (5).jpeg", "bag.png"],
    names: ["Mirror-Work Kuchi Clutch", "Beaded Evening Clutch", "Tribal Embroidered Pouch", "Velvet Jewel Clutch", "Festival Coin Clutch", "Hand-Stitched Wristlet", "Embroidered Mini Bag", "Bridal Beaded Purse", "Everyday Kuchi Pouch", "Heritage Clutch"], base: 32 },
  { id: "carpets", name: "Afghan Carpets", color: "#B3261E", cover: "Afghan_Carpet (7).jpeg",
    images: ["Afghan_Carpet (1).jpeg", "Afghan_Carpet (3).jpeg", "Afghan_Carpet (7).jpeg", "Afghan_Carpet (5).jpeg", "Afghan_Carpet (4).jpeg", "Afghan_Carpet (6).jpeg", "Afghan_Carpet (8).jpeg", "Afghan_Carpet (1).jpg"],
    names: ["Heritage Red Carpet", "Kabul Wool Carpet", "Kilim Runner", "Royal Bokhara Carpet", "Tribal Medallion Rug", "Ruby Hallway Runner", "Antique Loom Rug", "Deep Garnet Carpet", "Nomad Pattern Rug", "Master Weaver Carpet"], base: 240 }
];

export const STATUS = ["NEW", "POPULAR", "HANDMADE", "LIMITED", "PREMIUM"];

export const DESC = {
  men: "Embroidered waistcoats, kurtas and ceremony sets — cut for everyday wear and for celebrations.",
  women: "Kuchi gowns and mirror-work dresses, stitched by hand over many weeks.",
  shawls: "Wool shawls, patoos, pakol hats and woven bags in traditional patterns.",
  accessories: "Beaded and mirror-work clutches: small pieces with big heritage.",
  carpets: "Bokhara and kilim carpets, knotted on traditional looms by master weavers."
};

export const TAGS = { men: ["Kurta", "Waistcoat", "Premium"], women: ["Kuchi", "Embroidered", "Festive"], shawls: ["Wool", "Pakol", "Woven"], accessories: ["Clutch", "Mirror-work", "Beaded"], carpets: ["Bokhara", "Kilim", "Wool"] };

let uid = 0;
export const PRODUCTS = CATS.flatMap(c => c.names.map((name, i) => ({
  id: ++uid, cat: c.id, catName: c.name, name,
  image: asset(c.images[i % c.images.length]),
  image2: asset(c.images[(i + 1) % c.images.length]),
  price: c.base + ((i * 17 + uid * 7) % 8) * (c.base > 100 ? 18 : 5),
  status: STATUS[(i + uid) % STATUS.length]
})));

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
export const countIn = id => PRODUCTS.filter(p => p.cat === id).length;

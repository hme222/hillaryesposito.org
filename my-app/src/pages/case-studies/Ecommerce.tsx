// src/pages/case-studies/Ecommerce.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { products, Product } from "../../data/products";

type ProductLike = Product & { description?: string; images?: string[] };
type CartItem    = { productId: string; qty: number };

const CART_KEY = "ecommerce-demo-cart-v3";
const DEMO_URL: string | null = null;

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function safeGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch {} }

function useLiveAnnouncer() {
  const [msg, setMsg] = useState("");
  const t = useRef<number | null>(null);
  const announce = useCallback((m: string) => {
    setMsg("");
    requestAnimationFrame(() => setMsg(m));
    if (t.current) clearTimeout(t.current);
    t.current = window.setTimeout(() => setMsg(""), 1400);
  }, []);
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);
  return { liveMessage: msg, announce };
}

function getPrimaryImage(p: any) { return p?.images?.[0] ?? p?.image ?? ""; }

const CASE_BLOCKS = [
  {
    icon: "🎯",
    title: "Design goals",
    items: [
      "Fast discovery: search, filters, and sorting feel immediate",
      "Reduce uncertainty: quick view shows details without losing context",
      "Low-friction cart edits: drawer pattern supports quick adjustments",
      "Accessible defaults: focus, announcements, and ESC behavior are consistent",
    ],
  },
  {
    icon: "💡",
    title: "Key UX decisions",
    items: [
      "Demo is opt-in via toggle — page reads calm by default",
      "Cart lives in the demo header, not the portfolio hero",
      "One primary CTA per card (Add to cart); quick view is secondary",
      "Predictable keyboard flows across all dialog/drawer interactions",
    ],
  },
  {
    icon: "♿",
    title: "Accessibility patterns",
    items: [
      "Quick view: ESC to close, focus restored on dismiss",
      "Cart drawer: ESC + backdrop click + full focus trap",
      "Live region announcements for add / remove / clear",
      "Skip link lets keyboard users jump straight to the demo",
    ],
  },
  {
    icon: "⚙️",
    title: "Constraints",
    items: [
      "Static product data — keeps focus on interaction patterns",
      "Demo checkout: realistic totals, no real payment processed",
      "localStorage persistence mirrors real cart 'return' behavior",
    ],
  },
];

const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "A mobile app helping users plan meals around seasonal, local produce — reducing decision friction and making sustainable eating more accessible.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "👑",
    title: "Reina App",
    desc: "A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.",
    path: "/case-study/reina",
  },
];

export default function Ecommerce() {
  const allProducts = products as ProductLike[];
  const navigate    = useNavigate();

  const [demoOpen, setDemoOpen] = useState(false);

  const categories = useMemo(() => {
    const s = new Set<string>();
    allProducts.forEach((p) => p.category && s.add(p.category));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [allProducts]);

  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("All");
  const [sort,     setSort]     = useState<"featured"|"name-asc"|"price-asc"|"price-desc">("featured");

  const prices      = useMemo(() => allProducts.map((p) => Number(p.price)).filter(isFinite), [allProducts]);
  const minPossible = useMemo(() => prices.length ? Math.min(...prices) : 0, [prices]);
  const maxPossible = useMemo(() => prices.length ? Math.max(...prices) : 0, [prices]);
  const [minPrice, setMinPrice] = useState(minPossible);
  const [maxPrice, setMaxPrice] = useState(maxPossible);
  useEffect(() => { setMinPrice(minPossible); setMaxPrice(maxPossible); }, [minPossible, maxPossible]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const s = safeGet(CART_KEY);
    if (!s) return [];
    try {
      const p = JSON.parse(s) as CartItem[];
      if (!Array.isArray(p)) return [];
      return p.filter((x) => x && typeof x.productId === "string" && typeof x.qty === "number")
               .map((x) => ({ productId: x.productId, qty: clamp(Math.floor(x.qty), 1, 999) }));
    } catch { return []; }
  });
  useEffect(() => { safeSet(CART_KEY, JSON.stringify(cart)); }, [cart]);

  const productById = useMemo(() => {
    const m = new Map<string, ProductLike>();
    allProducts.forEach((p) => m.set(String(p.id), p));
    return m;
  }, [allProducts]);

  const cartLines = useMemo(() =>
    cart.map((l) => { const p = productById.get(l.productId); return p ? { product: p, qty: l.qty } : null; })
        .filter(Boolean) as Array<{ product: ProductLike; qty: number }>,
    [cart, productById]
  );

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal  = useMemo(() => cartLines.reduce((s, l) => s + Number(l.product.price) * l.qty, 0), [cartLines]);
  const shipping  = subtotal > 0 ? 6 : 0;
  const tax       = subtotal > 0 ? Math.round(subtotal * 0.07 * 100) / 100 : 0;
  const total     = subtotal + shipping + tax;

  const { liveMessage, announce } = useLiveAnnouncer();

  function addToCart(productId: string, name?: string) {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.productId === productId);
      if (i === -1) return [...prev, { productId, qty: 1 }];
      const n = [...prev];
      n[i] = { ...n[i], qty: clamp(n[i].qty + 1, 1, 999) };
      return n;
    });
    announce(name ? `${name} added to cart.` : "Added to cart.");
  }

  function setQty(productId: string, qty: number, name?: string) {
    const next = clamp(Math.floor(qty), 0, 999);
    setCart((prev) => next <= 0
      ? prev.filter((x) => x.productId !== productId)
      : prev.map((x) => x.productId === productId ? { ...x, qty: next } : x)
    );
    if (next <= 0) announce(name ? `${name} removed from cart.` : "Removed from cart.");
  }

  function removeFromCart(productId: string, name?: string) {
    setCart((prev) => prev.filter((x) => x.productId !== productId));
    announce(name ? `${name} removed from cart.` : "Removed from cart.");
  }

  function clearCart() { setCart([]); announce("Cart cleared."); }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allProducts.filter((p) => {
      const price = Number(p.price);
      if (!isFinite(price)) return false;
      return (category === "All" || p.category === category)
          && price >= minPrice && price <= maxPrice
          && (!q || [(p.name ?? ""), (p.description ?? ""), (p.category ?? "")]
              .some((s) => s.toLowerCase().includes(q)));
    });
    if (sort === "price-asc")  list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-desc") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "name-asc")   list = [...list].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    return list;
  }, [allProducts, category, minPrice, maxPrice, query, sort]);

  function resetFilters() {
    setQuery(""); setCategory("All"); setSort("featured");
    setMinPrice(minPossible); setMaxPrice(maxPossible);
    announce("Filters reset.");
  }

  const resultsLabel = useMemo(() => {
    const p: string[] = [];
    if (category !== "All") p.push(category);
    if (query.trim()) p.push(`"${query.trim()}"`);
    p.push(`${formatUSD(minPrice)}–${formatUSD(maxPrice)}`);
    return p.join(" · ");
  }, [category, query, minPrice, maxPrice]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const activeProduct = useMemo(() => activeId ? productById.get(activeId) ?? null : null, [activeId, productById]);

  function openQuickView(id: string) {
    lastFocus.current = document.activeElement as HTMLElement;
    setActiveId(id);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      requestAnimationFrame(() =>
        dialogRef.current?.querySelector<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')?.focus()
      );
    });
  }

  const closeQuickView = useCallback(() => {
    dialogRef.current?.close();
    setActiveId(null);
    requestAnimationFrame(() => lastFocus.current?.focus?.());
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const h = (e: Event) => { e.preventDefault(); closeQuickView(); };
    dlg.addEventListener("cancel", h);
    return () => dlg.removeEventListener("cancel", h);
  }, [closeQuickView]);

  const [cartOpen, setCartOpen] = useState(false);
  const cartPanelRef = useRef<HTMLDivElement | null>(null);
  const cartBtnRef   = useRef<HTMLButtonElement | null>(null);

  function openCart() {
    lastFocus.current = document.activeElement as HTMLElement;
    setCartOpen(true);
    requestAnimationFrame(() =>
      cartPanelRef.current?.querySelector<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')?.focus()
    );
  }

  function closeCart() {
    setCartOpen(false);
    requestAnimationFrame(() => (lastFocus.current ?? cartBtnRef.current)?.focus?.());
  }

  useEffect(() => {
    if (!cartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); closeCart(); return; }
      if (e.key !== "Tab") return;
      const el = cartPanelRef.current;
      if (!el) return;
      const foc = Array.from(el.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter((x) => !x.hasAttribute("disabled"));
      if (!foc.length) return;
      const active = document.activeElement as HTMLElement;
      if (!e.shiftKey && active === foc[foc.length - 1]) { e.preventDefault(); foc[0].focus(); }
      else if (e.shiftKey && active === foc[0]) { e.preventDefault(); foc[foc.length - 1].focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cartOpen]);

  useEffect(() => {
    if (!demoOpen) { setCartOpen(false); closeQuickView(); }
  }, [demoOpen, closeQuickView]);

  return (
    // NOTE: "ecommerce-cs" NOT "case-study" — avoids the 900px max-width constraint
    <main className="ecommerce-cs ecom-page lux" aria-label="E-Commerce Storefront Case Study">
      <a href="#ecom-demo" className="sr-only-focusable">Skip to interactive demo</a>
      <div aria-live="polite" aria-atomic="true" className="sr-only">{liveMessage}</div>

      {/* ══════════════════════════════════════
          HERO — full-width two-column
      ══════════════════════════════════════ */}
      <header className="ecom-page-hero">
        <div className="ecom-page-wrap">
          <div className="ecom-page-hero__inner">

            {/* Left copy */}
            <div className="ecom-page-hero__copy">
              <p className="meta">Personal project · UI Engineering · Accessibility-first</p>
              <h1>E-Commerce<br/>Storefront</h1>
              <p className="ecom-page-hero__intro">
                A premium-feeling storefront demo with full keyboard and screen
                reader support across the flows that matter most — discovery,
                product quick view, and a cart drawer.
              </p>
            </div>

            {/* Right: a11y badge grid */}
            <div className="ecom-page-hero__badges" aria-hidden="true">
              {[
                { icon: "⌨️", label: "Keyboard nav",  sub: "Full tab + arrow support" },
                { icon: "🔒", label: "Focus trap",     sub: "Dialog + drawer contained" },
                { icon: "📢", label: "Live regions",   sub: "Cart feedback announced" },
                { icon: "✅", label: "WCAG",           sub: "Contrast + focus visible" },
              ].map((b) => (
                <div key={b.label} className="ecom-page-badge feature">
                  <span className="ecom-page-badge__icon">{b.icon}</span>
                  <div>
                    <p className="ecom-page-badge__label">{b.label}</p>
                    <p className="ecom-page-badge__sub">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Meta strip — full width */}
      <div className="ecom-page-wrap">
        <div className="gh-meta-strip ecom-page-meta">
          {[
            { label: "Type",  value: "Personal project" },
            { label: "Stack", value: "React · TypeScript" },
            { label: "Data",  value: "Local TypeScript" },
            { label: "Cart",  value: "localStorage" },
            { label: "A11y",  value: "Keyboard + Screen Reader" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="gh-meta-strip__item">
                <span className="gh-meta-strip__label">{item.label}</span>
                <span className="gh-meta-strip__value">{item.value}</span>
              </div>
              {i < arr.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CASE STUDY — 3-col card grid (wider)
      ══════════════════════════════════════ */}
      <section className="ecom-page-section" aria-label="Case study">
        <div className="ecom-page-wrap">
          <div className="ecom-page-section__header">
            <h2>Case Study</h2>
            <p className="ecom-page-section__lead">
              Build the flows that matter most for e-commerce — discovery,
              confidence, cart — with accessibility baked in from the start,
              not added at the end.
            </p>
          </div>

          {/* 3-column card grid on wide screens */}
          <div className="ecom-page-case-grid">
            {CASE_BLOCKS.map((block) => (
              <div key={block.title} className="feature ecom-case-card">
                <div className="ecom-case-card__header">
                  <span className="ecom-case-card__icon" aria-hidden="true">{block.icon}</span>
                  <h3>{block.title}</h3>
                </div>
                <ul className="ecom-bullets">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Next steps — separate full-width card */}
          <div className="feature ecom-case-card ecom-page-next-card">
            <div className="ecom-case-card__header">
              <span className="ecom-case-card__icon" aria-hidden="true">🔭</span>
              <h3>Next steps</h3>
            </div>
            <div className="ecom-page-next-grid">
              {[
                "Usability testing: validate filters + quick view usefulness",
                "Cross-device SR audit (NVDA / JAWS / VoiceOver)",
                "Performance: image sizing + loading strategy",
                "Analytics instrumentation for the key interaction events",
              ].map((item) => (
                <div key={item} className="ecom-page-next-item">
                  <span className="ecom-page-next-bullet" aria-hidden="true">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DEMO SECTION
      ══════════════════════════════════════ */}
      <section id="ecom-demo" className="ecom-demoSection ecom-page-demo-section"
        aria-label="Interactive storefront demo">
        <div className="ecom-page-wrap">

          <div className="ecom-page-demo-header">
            <div className="ecom-page-demo-header__copy">
              <h2 className="ecom-demoTitle">Interactive demo</h2>
              <p className="ecom-demoSubtitle">
                The full experience is isolated below. Toggle it on to explore
                filters, quick view, and the cart drawer.
              </p>
            </div>

            {/* Summary strip + toggle in one row */}
            <div className="ecom-page-demo-header__controls">
              <div className="gh-validation-strip feature ecom-page-demo-strip">
                {[
                  { label: "Discovery",  value: "Search + filters + sort" },
                  { label: "Confidence", value: "Quick view modal" },
                  { label: "Cart",       value: "Drawer + focus trap" },
                ].map((item, i, arr) => (
                  <React.Fragment key={item.label}>
                    <div className="gh-vstrip-item">
                      <p className="gh-vstrip-label">{item.label}</p>
                      <p className="gh-vstrip-value">{item.value}</p>
                    </div>
                    {i < arr.length - 1 && <div className="gh-vstrip-divider" aria-hidden="true" />}
                  </React.Fragment>
                ))}
              </div>
              <button type="button" className="ecom-demoToggle ecom-page-demo-toggle"
                onClick={() => setDemoOpen((v) => !v)}
                aria-expanded={demoOpen} aria-controls="ecom-demoPanel">
                {demoOpen ? "Close demo ↑" : "Open demo ↓"}
              </button>
            </div>
          </div>

          {!demoOpen ? (
            <div className="ecom-demoClosed" role="region" aria-label="Demo preview">
              <div className="ecom-demoPreviewGrid">
                {[
                  { kicker: "Discovery",  title: "Search + filters",  desc: "Category, price range, sorting, and live results." },
                  { kicker: "Confidence", title: "Quick view modal",  desc: "ESC close, focus restore, clean hierarchy." },
                  { kicker: "Cart",       title: "Drawer pattern",    desc: "Focus trap, quantity controls, totals, announcements." },
                ].map((c) => (
                  <div key={c.kicker} className="ecom-demoPreviewCard">
                    <div className="ecom-demoKicker">{c.kicker}</div>
                    <div className="ecom-demoPreviewTitle">{c.title}</div>
                    <p className="ecom-demoPreviewDesc">{c.desc}</p>
                  </div>
                ))}
              </div>
              <p className="ecom-demoNote" role="note">
                Static demo. Products from local TypeScript data. Cart persists via{" "}
                <strong>localStorage</strong>. No payment is processed.
              </p>
              {DEMO_URL && (
                <div className="ecom-demoExternal">
                  <a className="ecom-demoExternalLink" href={DEMO_URL} target="_blank" rel="noreferrer">
                    Open live demo in new tab →
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div id="ecom-demoPanel" className="ecom-demoOpen" role="region" aria-label="Demo panel">
              <div className="ecom-deviceFrame" role="group" aria-label="Storefront demo frame">
                <div className="ecom-deviceTop" aria-hidden="true">
                  <div className="ecom-deviceDots"><span /><span /><span /></div>
                  <div className="ecom-deviceUrl">storefront.demo</div>
                </div>
                <div className="ecom-deviceBody">
                  <div className="ecom-wide ecom-demoWide">
                    <div className="ecom-storefront-head">
                      <div>
                        <div className="ecom-band-title">Storefront</div>
                        <div className="ecom-band-subtitle">Filters · Quick View · Cart Drawer</div>
                      </div>
                      <button ref={cartBtnRef} type="button" className="ecom-cart-pill"
                        onClick={openCart} aria-haspopup="dialog"
                        aria-expanded={cartOpen} aria-controls="ecom-cart-drawer">
                        Cart <span aria-hidden="true">·</span>{" "}
                        <span aria-label={`${cartCount} items`}>{cartCount}</span>
                      </button>
                    </div>

                    <div className="highlight ecom-highlight" role="note">
                      <strong>Static demo.</strong> Products from local TypeScript data.
                      Cart via <strong>localStorage</strong>. No payment processed.
                    </div>

                    <section className="feature ecommerce-controls" aria-label="Filters and sorting">
                      <div className="ecom-controls-grid">
                        <div className="form-group ecom-field">
                          <label htmlFor="ecom-search">Search</label>
                          <input id="ecom-search" type="search" value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products, categories…"
                            aria-describedby="ecom-search-help" />
                          <p id="ecom-search-help" className="ecom-help">Try "tee" or "Accessories".</p>
                        </div>
                        <div className="form-group ecom-field">
                          <label htmlFor="ecom-category">Category</label>
                          <select id="ecom-category" value={category}
                            onChange={(e) => setCategory(e.target.value)} className="ecom-select">
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="form-group ecom-field">
                          <label htmlFor="ecom-sort">Sort</label>
                          <select id="ecom-sort" value={sort}
                            onChange={(e) => setSort(e.target.value as any)} className="ecom-select">
                            <option value="featured">Featured</option>
                            <option value="name-asc">Name (A–Z)</option>
                            <option value="price-asc">Price (Low–High)</option>
                            <option value="price-desc">Price (High–Low)</option>
                          </select>
                        </div>
                        <div className="form-group ecom-field">
                          <label id="ecom-price-label">Price range</label>
                          <div className="ecom-range" role="group" aria-labelledby="ecom-price-label">
                            <input aria-label="Minimum price" type="number"
                              min={minPossible} max={maxPossible} value={minPrice}
                              onChange={(e) => { const v = Number(e.target.value); setMinPrice(clamp(isFinite(v) ? v : minPossible, minPossible, maxPrice)); }} />
                            <span aria-hidden="true">—</span>
                            <input aria-label="Maximum price" type="number"
                              min={minPossible} max={maxPossible} value={maxPrice}
                              onChange={(e) => { const v = Number(e.target.value); setMaxPrice(clamp(isFinite(v) ? v : maxPossible, minPrice, maxPossible)); }} />
                          </div>
                          <p className="ecom-help">{formatUSD(minPrice)} – {formatUSD(maxPrice)}</p>
                        </div>
                        <div className="ecom-controls-actions">
                          <button type="button" className="submit-btn" onClick={resetFilters}>Reset</button>
                        </div>
                      </div>
                      <div className="ecom-results" role="status" aria-live="polite">
                        <span><strong>{filtered.length}</strong> result{filtered.length === 1 ? "" : "s"}</span>
                        <span className="ecom-results-label">{resultsLabel}</span>
                      </div>
                    </section>

                    <section aria-label="Product results">
                      <div className="ecom-products-head"><h2 id="ecom-products">Products</h2></div>
                      {filtered.length === 0 ? (
                        <div className="feature ecom-empty" role="region" aria-label="No results">
                          <h3>No matches</h3>
                          <p>Try resetting filters or broadening your search.</p>
                          <button type="button" className="hero-btn" onClick={resetFilters}>Reset filters</button>
                        </div>
                      ) : (
                        <div className="ecom-grid" role="list">
                          {filtered.map((p) => {
                            const id = String(p.id);
                            return (
                              <article key={id} className="ecom-card" role="listitem">
                                <button type="button" className="ecom-media"
                                  onClick={() => openQuickView(id)}
                                  aria-label={`Open quick view for ${p.name}`}>
                                  <img src={getPrimaryImage(p)} alt={p.name} loading="lazy" />
                                </button>
                                <div className="ecom-body">
                                  <h3 className="ecom-title">{p.name}</h3>
                                  <p className="ecom-meta">
                                    <span>{p.category}</span>{" "}<span aria-hidden="true">·</span>{" "}
                                    <span className="ecom-price">{formatUSD(Number(p.price))}</span>
                                  </p>
                                  {p.description && <p className="ecom-desc">{p.description}</p>}
                                  <div className="ecom-actions">
                                    <button type="button" className="hero-btn ecom-add"
                                      onClick={() => addToCart(id, p.name)}>Add to cart</button>
                                    <button type="button" className="ecom-quick"
                                      onClick={() => openQuickView(id)}
                                      aria-label={`Quick view: ${p.name}`} title="Quick view">👁</button>
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Quick View Dialog ── */}
      {demoOpen && (
        <dialog ref={dialogRef} className="ecom-dialog"
          aria-label="Product quick view" onClose={() => setActiveId(null)}>
          <div className="ecom-dialog-inner">
            <div className="ecom-dialog-head">
              <h2 className="ecom-dialog-title">{activeProduct?.name ?? "Product"}</h2>
              <button type="button" className="ecom-icon-btn" onClick={closeQuickView}
                aria-label="Close quick view">✕</button>
            </div>
            {activeProduct ? (
              <div className="ecom-dialog-body">
                <div className="ecom-dialog-media">
                  <img src={getPrimaryImage(activeProduct)} alt={activeProduct.name} />
                </div>
                <div className="ecom-dialog-details">
                  <p className="ecom-dialog-price">{formatUSD(Number(activeProduct.price))}</p>
                  <p className="ecom-dialog-cat">{activeProduct.category}</p>
                  {activeProduct.description && <p className="ecom-dialog-desc">{activeProduct.description}</p>}
                  <div className="ecom-dialog-actions">
                    <button type="button" className="hero-btn"
                      onClick={() => addToCart(String(activeProduct.id), activeProduct.name)}>
                      Add to cart
                    </button>
                    <button type="button" className="ecom-link" onClick={closeQuickView}>
                      Continue browsing
                    </button>
                  </div>
                </div>
              </div>
            ) : <p>Loading…</p>}
          </div>
        </dialog>
      )}

      {/* ── Cart Drawer ── */}
      {demoOpen && cartOpen && (
        <div className="ecom-drawer-root" role="presentation">
          <button className="ecom-backdrop" aria-label="Close cart" onClick={closeCart} />
          <aside id="ecom-cart-drawer" ref={cartPanelRef} className="ecom-drawer"
            role="dialog" aria-modal="true" aria-label="Shopping cart">
            <div className="ecom-drawer-head">
              <h2>Cart</h2>
              <button type="button" className="ecom-icon-btn" onClick={closeCart} aria-label="Close cart">✕</button>
            </div>
            {cartLines.length === 0 ? (
              <div className="feature">
                <h3>Your cart is empty</h3>
                <p>Add a product to see totals and quantity controls.</p>
                <button type="button" className="hero-btn" onClick={closeCart}>Browse products</button>
              </div>
            ) : (
              <>
                <ul className="ecom-cart-list" aria-label="Cart items">
                  {cartLines.map(({ product, qty }) => {
                    const id = String(product.id);
                    const price = Number(product.price);
                    return (
                      <li key={id} className="ecom-cart-item">
                        <div className="ecom-cart-main">
                          <div className="ecom-cart-title">
                            <span>{product.name}</span>
                            <span className="ecom-muted">{formatUSD(price)}</span>
                          </div>
                          <div className="ecom-qty-row">
                            <button type="button" className="ecom-qty-btn"
                              onClick={() => setQty(id, qty - 1, product.name)}
                              aria-label={`Decrease qty for ${product.name}`}>−</button>
                            <input className="ecom-qty-input" type="number" min={0} max={999}
                              value={qty} inputMode="numeric"
                              onChange={(e) => setQty(id, Number(e.target.value), product.name)}
                              aria-label={`Quantity for ${product.name}`} />
                            <button type="button" className="ecom-qty-btn"
                              onClick={() => setQty(id, qty + 1, product.name)}
                              aria-label={`Increase qty for ${product.name}`}>+</button>
                            <button type="button" className="ecom-link ecom-remove"
                              onClick={() => removeFromCart(id, product.name)}
                              aria-label={`Remove ${product.name} from cart`}>Remove</button>
                          </div>
                        </div>
                        <div className="ecom-cart-lineTotal"
                          aria-label={`Line total ${formatUSD(price * qty)}`}>
                          {formatUSD(price * qty)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="feature ecom-summary" aria-label="Order summary">
                  {[
                    { label: "Subtotal",          value: formatUSD(subtotal) },
                    { label: "Estimated shipping", value: formatUSD(shipping) },
                    { label: "Estimated tax",      value: formatUSD(tax) },
                  ].map((row) => (
                    <div key={row.label} className="ecom-row">
                      <span className="ecom-muted">{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                  <div className="ecom-row ecom-total">
                    <strong>Total</strong>
                    <strong>{formatUSD(total)}</strong>
                  </div>
                  <div className="ecom-summary-actions">
                    <button type="button" className="submit-btn"
                      onClick={() => { announce("Demo checkout complete."); alert("Demo checkout complete! (No payment processed.)"); }}>
                      Checkout (Demo)
                    </button>
                    <button type="button" className="ecom-link" onClick={clearCart}>Clear cart</button>
                  </div>
                  <p className="ecom-help">Demo-only. Cart persists via localStorage.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* ══════════════════════════════════════
          OTHER PROJECTS
      ══════════════════════════════════════ */}
      <div className="ecom-page-wrap">
        <aside className="gh-other-projects" aria-label="Other projects">
          <div className="gh-other-projects__header">
            <p className="gh-other-projects__eyebrow">More Work</p>
            <h2 style={{ margin: "0.25rem 0 0" }}>Other Projects</h2>
          </div>
          <div className="gh-other-projects__grid">
            {OTHER_PROJECTS.map((proj) => (
              <article
                key={proj.path}
                className="project-card gh-proj-card"
                onClick={() => navigate(proj.path)}
                role="button"
                tabIndex={0}
                aria-label={`View ${proj.title} case study`}
                onKeyDown={(e) => e.key === "Enter" && navigate(proj.path)}
              >
                <div className="project-media">
                  <div className="project-icon">{proj.icon}</div>
                </div>
                <div className="project-body">
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <span className="gh-proj-cta">View case study →</span>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button type="button" className="hero-btn" onClick={() => navigate("/")}
              style={{ fontSize: "0.85rem", padding: "0.9rem 2rem", letterSpacing: "1.5px" }}>
              ← Back to All Work
            </button>
          </div>
        </aside>
      </div>

    </main>
  );
}
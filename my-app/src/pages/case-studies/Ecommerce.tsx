// src/pages/case-studies/Ecommerce.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { products, Product } from "../../data/products";
import "./Ecommerce.css";

type ProductLike = Product & {
  description?: string;
  images?: string[];
};

type CartItem = { productId: string; qty: number };

const CART_KEY = "ecommerce-demo-cart-v2";

// If you deploy just the storefront/demo somewhere, drop it here.
// Example: const DEMO_URL = "https://yourdomain.com/#/case-study/ecommerce-demo";
const DEMO_URL: string | null = "https://your-live-demo-url.com";


function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Ecommerce() {
  const allProducts = products as ProductLike[];

  // Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allProducts]);

  // Filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"featured" | "name-asc" | "price-asc" | "price-desc">("featured");

  const prices = useMemo(
    () => allProducts.map((p) => Number(p.price)).filter((v) => Number.isFinite(v)),
    [allProducts]
  );
  const minPossible = useMemo(() => (prices.length ? Math.min(...prices) : 0), [prices]);
  const maxPossible = useMemo(() => (prices.length ? Math.max(...prices) : 0), [prices]);

  const [minPrice, setMinPrice] = useState(minPossible);
  const [maxPrice, setMaxPrice] = useState(maxPossible);

  useEffect(() => {
    setMinPrice(minPossible);
    setMaxPrice(maxPossible);
  }, [minPossible, maxPossible]);

  // Cart (localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved) as CartItem[];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((x) => x && typeof x.productId === "string" && typeof x.qty === "number")
        .map((x) => ({ productId: x.productId, qty: clamp(Math.floor(x.qty), 1, 999) }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const productById = useMemo(() => {
    const map = new Map<string, ProductLike>();
    allProducts.forEach((p) => map.set(String(p.id), p));
    return map;
  }, [allProducts]);

  const cartLines = useMemo(() => {
    return cart
      .map((line) => {
        const p = productById.get(line.productId);
        return p ? { product: p, qty: line.qty } : null;
      })
      .filter(Boolean) as Array<{ product: ProductLike; qty: number }>;
  }, [cart, productById]);

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + Number(l.product.price) * l.qty, 0),
    [cartLines]
  );
  const shipping = subtotal > 0 ? 6 : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.07 * 100) / 100 : 0;
  const total = subtotal + shipping + tax;

  // Accessible announcements
  const [liveMessage, setLiveMessage] = useState("");
  const liveTimer = useRef<number | null>(null);
  function announce(msg: string) {
    setLiveMessage(msg);
    if (liveTimer.current) window.clearTimeout(liveTimer.current);
    liveTimer.current = window.setTimeout(() => setLiveMessage(""), 1200);
  }

  function addToCart(productId: string) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId);
      if (idx === -1) return [...prev, { productId, qty: 1 }];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: clamp(next[idx].qty + 1, 1, 999) };
      return next;
    });
    announce("Added to cart.");
  }

  function setQty(productId: string, qty: number) {
    const nextQty = clamp(Math.floor(qty), 0, 999);
    setCart((prev) => {
      if (nextQty <= 0) return prev.filter((x) => x.productId !== productId);
      return prev.map((x) => (x.productId === productId ? { ...x, qty: nextQty } : x));
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((x) => x.productId !== productId));
    announce("Removed from cart.");
  }

  function clearCart() {
    setCart([]);
    announce("Cart cleared.");
  }

  // Filter + Sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = allProducts.filter((p) => {
      const price = Number(p.price);
      if (!Number.isFinite(price)) return false;

      const inCategory = category === "All" ? true : p.category === category;
      const inPrice = price >= minPrice && price <= maxPrice;

      const inQuery =
        !q ||
        (p.name ?? "").toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q);

      return inCategory && inPrice && inQuery;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name-asc":
        list = [...list].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;
      case "featured":
      default:
        break;
    }

    return list;
  }, [allProducts, category, minPrice, maxPrice, query, sort]);

  // Quick View (dialog)
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const activeProduct = useMemo(
    () => (activeId ? productById.get(activeId) ?? null : null),
    [activeId, productById]
  );

  function openQuickView(productId: string) {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setActiveId(productId);
    window.requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      window.requestAnimationFrame(() => {
        dialogRef.current
          ?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          ?.focus();
      });
    });
  }

  const closeQuickView = useCallback(() => {
    dialogRef.current?.close();
    setActiveId(null);
    window.requestAnimationFrame(() => lastFocus.current?.focus?.());
  }, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    const onCancel = (e: Event) => {
      e.preventDefault();
      closeQuickView();
    };

    dlg.addEventListener("cancel", onCancel);
    return () => dlg.removeEventListener("cancel", onCancel);
  }, [closeQuickView]);

  // Cart drawer
  const [cartOpen, setCartOpen] = useState(false);
  const cartPanelRef = useRef<HTMLDivElement | null>(null);
  const cartBtnRef = useRef<HTMLButtonElement | null>(null);

  function openCart() {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setCartOpen(true);
    window.requestAnimationFrame(() => {
      cartPanelRef.current
        ?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        ?.focus();
    });
  }

  function closeCart() {
    setCartOpen(false);
    window.requestAnimationFrame(() => (lastFocus.current ?? cartBtnRef.current)?.focus?.());
  }

  useEffect(() => {
    if (!cartOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCart();
        return;
      }
      if (e.key !== "Tab") return;

      const container = cartPanelRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [cartOpen]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSort("featured");
    setMinPrice(minPossible);
    setMaxPrice(maxPossible);
    announce("Filters reset.");
  }

  const resultsLabel = useMemo(() => {
    const parts: string[] = [];
    if (category !== "All") parts.push(category);
    if (query.trim()) parts.push(`“${query.trim()}”`);
    parts.push(`${formatUSD(minPrice)}–${formatUSD(maxPrice)}`);
    return parts.join(" · ");
  }, [category, query, minPrice, maxPrice]);

  // Demo Drawer behavior: scroll into view when opened
  const demoDetailsRef = useRef<HTMLDetailsElement | null>(null);
  useEffect(() => {
    const el = demoDetailsRef.current;
    if (!el) return;

    const onToggle = () => {
      if (el.open) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <main className="case-study ecommerce-cs" aria-label="E-Commerce Platform Case Study">
      {/* a11y helpers */}
      <a href="#ecom-storefront" className="sr-only-focusable">
        Skip to storefront
      </a>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      {/* Header */}
      <header className="cs-header ecommerce-header">
        <div className="ecom-header-row">
          <div className="ecom-header-copy">
            <h1>E-Commerce Platform</h1>
            <p className="meta">Personal project · Layout + features · Accessible interactions</p>

            <p className="intro">
              A storefront demo focused on product discovery and purchase confidence: filtering, quick view, and a cart
              drawer with keyboard + screen-reader support.
            </p>

            <div className="ecom-overview">
              <div className="feature ecom-overview-card">
                <h2>Project Summary</h2>
                <p>
                  Built a static storefront demo with filtering, a quick view modal, and a cart drawer—designed to feel
                  premium and function accessibly.
                </p>
              </div>
              <div className="feature ecom-overview-card">
                <h2>Focus</h2>
                <p>Information hierarchy, polished layouts, and accessible UI patterns (focus, announcements, ESC).</p>
              </div>
            </div>

            {/* Demo Drawer */}
            <section className="demo-drawer" id="demo" aria-label="Interactive demo">
              <details ref={demoDetailsRef} className="demo" id="demoDetails">
                <summary className="demo-summary">
                  <span className="demo-summary__title">View interactive demo</span>
                  <span className="demo-summary__hint">
                    {DEMO_URL ? "Opens an embedded demo" : "Reveals a quick demo overview"}
                  </span>
                  <span className="demo-summary__icon" aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className="demo-panel">
                  <div className="demo-panel__inner">
                    <div className="demo-panel__header">
                      <h3 className="demo-panel__title">Interactive Demo</h3>
                      <p className="demo-panel__sub">
                        Explore the layout, accessible patterns, and key flows (filters, quick view, cart drawer).
                      </p>
                    </div>

                    {DEMO_URL ? (
                      <div className="demo-embed" role="region" aria-label="Interactive demo embed">
                        <iframe title="E-commerce demo" src={DEMO_URL} loading="lazy" referrerPolicy="no-referrer" />
                      </div>
                    ) : (
                      <div className="demo-preview" role="region" aria-label="Demo preview">
                        <div className="demo-preview__grid">
                          <div className="demo-preview__card">
                            <div className="demo-preview__kicker">Discovery</div>
                            <div className="demo-preview__title">PLP filters + sorting</div>
                            <p className="demo-preview__desc">Search, category, and price range designed to be fast.</p>
                          </div>
                          <div className="demo-preview__card">
                            <div className="demo-preview__kicker">Confidence</div>
                            <div className="demo-preview__title">Quick View modal</div>
                            <p className="demo-preview__desc">ESC to close, focus restored, clean hierarchy.</p>
                          </div>
                          <div className="demo-preview__card">
                            <div className="demo-preview__kicker">Checkout</div>
                            <div className="demo-preview__title">Cart drawer</div>
                            <p className="demo-preview__desc">Focus trap + keyboard quantity controls + totals.</p>
                          </div>
                        </div>
                        <div className="demo-panel__footer">
                          <a className="demo-link" href="#ecom-storefront">
                            Jump to storefront ↓
                          </a>
                        </div>
                      </div>
                    )}

                    {DEMO_URL ? (
                      <div className="demo-panel__footer">
                        <a className="demo-link" href="#ecom-storefront">
                          Jump to storefront ↓
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </details>
            </section>
          </div>

          <div className="ecom-header-actions">
            <button
              ref={cartBtnRef}
              type="button"
              className="hero-btn ecom-cart-btn"
              onClick={openCart}
              aria-haspopup="dialog"
              aria-expanded={cartOpen}
              aria-controls="ecom-cart-drawer"
            >
              Cart <span aria-hidden="true">·</span> <span aria-label={`${cartCount} items`}>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Switcher */}
      <nav className="ecom-switcher" aria-label="Page sections">
        <a className="ecom-switcher-btn" href="#ecom-storefront">
          Storefront
        </a>
        <a className="ecom-switcher-btn" href="#ecom-case-study">
          Case Study
        </a>
      </nav>

      {/* Storefront band */}
      <section id="ecom-storefront" className="ecom-storefront" aria-label="Storefront demo">
        <div className="ecom-wide">
          {/* Storefront Head */}
          <div className="ecom-storefront-head">
            <div>
              <div className="ecom-band-title">Storefront</div>
              <div className="ecom-band-subtitle">Filters · Quick View · Cart Drawer</div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="highlight ecom-highlight" role="note" aria-label="Demo note">
            This is a <strong>static demo</strong>. Products are stored in local TypeScript data. Cart persists via{" "}
            <strong>localStorage</strong> (no payment processed).
          </div>

          {/* Controls */}
          <section className="feature ecommerce-controls" aria-label="Filters and sorting">
            <div className="ecom-controls-grid">
              <div className="form-group ecom-field">
                <label htmlFor="ecom-search">Search</label>
                <input
                  id="ecom-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories…"
                  aria-describedby="ecom-search-help"
                />
                <p id="ecom-search-help" className="ecom-help">
                  Try a keyword like “tee” or a category like “Accessories”.
                </p>
              </div>

              <div className="form-group ecom-field">
                <label htmlFor="ecom-category">Category</label>
                <select
                  id="ecom-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="ecom-select"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group ecom-field">
                <label htmlFor="ecom-sort">Sort</label>
                <select
                  id="ecom-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="ecom-select"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="price-asc">Price (Low–High)</option>
                  <option value="price-desc">Price (High–Low)</option>
                </select>
              </div>

              <div className="form-group ecom-field">
                <label id="ecom-price-label">Price range</label>
                <div className="ecom-range" role="group" aria-labelledby="ecom-price-label">
                  <input
                    aria-label="Minimum price"
                    type="number"
                    min={minPossible}
                    max={maxPossible}
                    value={minPrice}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      const next = Number.isFinite(v) ? v : minPossible;
                      setMinPrice(clamp(next, minPossible, maxPrice));
                    }}
                  />
                  <span aria-hidden="true">—</span>
                  <input
                    aria-label="Maximum price"
                    type="number"
                    min={minPossible}
                    max={maxPossible}
                    value={maxPrice}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      const next = Number.isFinite(v) ? v : maxPossible;
                      setMaxPrice(clamp(next, minPrice, maxPossible));
                    }}
                  />
                </div>
                <p className="ecom-help">
                  {formatUSD(minPrice)} – {formatUSD(maxPrice)}
                </p>
              </div>

              <div className="ecom-controls-actions">
                <button type="button" className="submit-btn ecom-reset" onClick={resetFilters}>
                  Reset
                </button>
              </div>
            </div>

            <div className="ecom-results" role="status" aria-live="polite">
              <span>
                <strong>{filtered.length}</strong> result{filtered.length === 1 ? "" : "s"}
              </span>
              <span className="ecom-results-label">{resultsLabel}</span>
            </div>
          </section>

          {/* Products */}
          <section aria-label="Product results">
            <div className="ecom-products-head">
              <h2 id="ecom-products">Products</h2>
            </div>

            {filtered.length === 0 ? (
              <div className="feature ecom-empty" role="region" aria-label="No results">
                <h3>No matches</h3>
                <p>Try resetting filters or broadening your search.</p>
                <button type="button" className="hero-btn" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="ecom-grid" role="list">
                {filtered.map((p) => {
                  const id = String(p.id);
                  const img = p.images?.[0] ?? (p as any).image;

                  return (
                    <article key={id} className="ecom-card" role="listitem">
                      <button
                        type="button"
                        className="ecom-media"
                        onClick={() => openQuickView(id)}
                        aria-label={`Quick view: ${p.name}`}
                      >
                        <img src={img} alt={p.name} loading="lazy" />
                      </button>

                      <div className="ecom-body">
                        <h3 className="ecom-title">{p.name}</h3>
                        <p className="ecom-meta">
                          <span>{p.category}</span> <span aria-hidden="true">·</span>{" "}
                          <span className="ecom-price">{formatUSD(Number(p.price))}</span>
                        </p>
                        {p.description ? <p className="ecom-desc">{p.description}</p> : null}

                        <div className="ecom-actions">
                          <button type="button" className="hero-btn ecom-add" onClick={() => addToCart(id)}>
                            Add to cart
                          </button>
                          <button type="button" className="ecom-link" onClick={() => openQuickView(id)}>
                            Quick view
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </section>

      {/* Case study body (normal width) */}
      <section id="ecom-case-study" className="ecom-caseStudy" aria-label="Case study">
        <div className="ecom-narrow">
          <h2>Case Study</h2>

          <section>
            <h3>Implementation Notes</h3>
            <div className="feature">
              <h4>Accessibility + UX</h4>
              <ul>
                <li>Keyboard-friendly filters and cart drawer focus trapping.</li>
                <li>Screen reader announcements for add/remove actions.</li>
                <li>Quick view modal supports ESC to close + restores focus.</li>
                <li>Cart drawer supports ESC + backdrop click to close.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>

      {/* Quick View Dialog */}
      <dialog
        ref={dialogRef}
        className="ecom-dialog"
        aria-label="Product quick view"
        onClose={() => setActiveId(null)}
      >
        <div className="ecom-dialog-inner">
          <div className="ecom-dialog-head">
            <h2 className="ecom-dialog-title">{activeProduct?.name ?? "Product"}</h2>
            <button type="button" className="ecom-icon-btn" onClick={closeQuickView} aria-label="Close quick view">
              ✕
            </button>
          </div>

          {activeProduct ? (
            <div className="ecom-dialog-body">
              <div className="ecom-dialog-media">
                <img src={activeProduct.images?.[0] ?? (activeProduct as any).image} alt={activeProduct.name} />
              </div>

              <div className="ecom-dialog-details">
                <p className="ecom-dialog-price">{formatUSD(Number(activeProduct.price))}</p>
                <p className="ecom-dialog-cat">{activeProduct.category}</p>
                {activeProduct.description ? <p className="ecom-dialog-desc">{activeProduct.description}</p> : null}

                <div className="ecom-dialog-actions">
                  <button type="button" className="hero-btn" onClick={() => addToCart(String(activeProduct.id))}>
                    Add to cart
                  </button>
                  <button type="button" className="ecom-link" onClick={closeQuickView}>
                    Continue browsing
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading…</p>
          )}
        </div>
      </dialog>

      {/* Cart Drawer */}
      {cartOpen ? (
        <div className="ecom-drawer-root" role="presentation">
          <button className="ecom-backdrop" aria-label="Close cart" onClick={closeCart} />
          <aside
            id="ecom-cart-drawer"
            ref={cartPanelRef}
            className="ecom-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="ecom-drawer-head">
              <h2>Cart</h2>
              <button type="button" className="ecom-icon-btn" onClick={closeCart} aria-label="Close cart">
                ✕
              </button>
            </div>

            {cartLines.length === 0 ? (
              <div className="feature">
                <h3>Your cart is empty</h3>
                <p>Add a product to see totals + quantity controls.</p>
                <button type="button" className="hero-btn" onClick={closeCart}>
                  Browse products
                </button>
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
                            <button
                              type="button"
                              className="ecom-qty-btn"
                              onClick={() => setQty(id, qty - 1)}
                              aria-label={`Decrease quantity for ${product.name}`}
                            >
                              −
                            </button>

                            <input
                              className="ecom-qty-input"
                              type="number"
                              min={0}
                              max={999}
                              value={qty}
                              onChange={(e) => setQty(id, Number(e.target.value))}
                              aria-label={`Quantity for ${product.name}`}
                              inputMode="numeric"
                            />

                            <button
                              type="button"
                              className="ecom-qty-btn"
                              onClick={() => setQty(id, qty + 1)}
                              aria-label={`Increase quantity for ${product.name}`}
                            >
                              +
                            </button>

                            <button
                              type="button"
                              className="ecom-link ecom-remove"
                              onClick={() => removeFromCart(id)}
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="ecom-cart-lineTotal" aria-label={`Line total ${formatUSD(price * qty)}`}>
                          {formatUSD(price * qty)}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="feature ecom-summary" aria-label="Order summary">
                  <div className="ecom-row">
                    <span className="ecom-muted">Subtotal</span>
                    <span>{formatUSD(subtotal)}</span>
                  </div>
                  <div className="ecom-row">
                    <span className="ecom-muted">Estimated shipping</span>
                    <span>{formatUSD(shipping)}</span>
                  </div>
                  <div className="ecom-row">
                    <span className="ecom-muted">Estimated tax</span>
                    <span>{formatUSD(tax)}</span>
                  </div>
                  <div className="ecom-row ecom-total">
                    <strong>Total</strong>
                    <strong>{formatUSD(total)}</strong>
                  </div>

                  <div className="ecom-summary-actions">
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={() => {
                        announce("Demo checkout complete.");
                        alert("Demo checkout complete! (No payment processed.)");
                      }}
                    >
                      Checkout (Demo)
                    </button>

                    <button type="button" className="ecom-link" onClick={clearCart}>
                      Clear cart
                    </button>
                  </div>

                  <p className="ecom-help">Demo-only checkout. Cart persists in your browser via localStorage.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </main>
  );
}

import React, { useState } from "react";

export type ScreenSequenceItem = {
  name: string;
  category: string;
  image: string;
  alt: string;
  summary: string;
};

export default function ScreenSequence({
  label,
  items,
}: {
  label: string;
  items: ScreenSequenceItem[];
}) {
  const [current, setCurrent] = useState(0);
  const item = items[current];

  const move = (direction: number) => {
    setCurrent((value) => (value + direction + items.length) % items.length);
  };

  return (
    <div className="fp-sequence" aria-label={label}>
      <div className="fp-sequence__stage">
        <div className="fp-sequence__phone">
          <img src={item.image} alt={item.alt} />
        </div>
        <div className="fp-sequence__copy" aria-live="polite">
          <p className="rp-kicker">{item.category}</p>
          <h3>{item.name}</h3>
          <p>{item.summary}</p>
        </div>
      </div>
      <div className="fp-sequence__controls">
        <button type="button" onClick={() => move(-1)} aria-label="Show previous documented app">← Previous</button>
        <p><b>{String(current + 1).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")}</p>
        <button type="button" onClick={() => move(1)} aria-label="Show next documented app">Next →</button>
      </div>
      <div className="fp-sequence__dots" aria-label="Choose a documented app">
        {items.map((screen, index) => (
          <button
            type="button"
            key={screen.name}
            className={index === current ? "is-active" : ""}
            aria-pressed={index === current}
            onClick={() => setCurrent(index)}
          >
            {screen.name}
          </button>
        ))}
      </div>
    </div>
  );
}

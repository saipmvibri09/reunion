"use client";

import { useState, type CSSProperties } from "react";

export function ThenNow() {
  const [position, setPosition] = useState(50);
  const style = { "--reveal": `${position}%` } as CSSProperties;

  return (
    <div className="memory-comparison" style={style}>
      <div className="memory-frame" aria-hidden="true">
        <div className="memory-image memory-image--now" />
        <div className="memory-image memory-image--then" />
        <div className="memory-divider">
          <span>Drag</span>
        </div>
        <span className="memory-year memory-year--then">Then</span>
        <span className="memory-year memory-year--now">Now</span>
      </div>
      <label className="memory-control">
        <span className="sr-only">Reveal the present-day reunion photograph</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${position}% of the present-day photograph revealed`}
        />
      </label>
      <div className="memory-mobile" aria-label="The same group of friends, then and now">
        <figure>
          <div className="memory-mobile-image memory-mobile-image--then" />
          <figcaption>Then · college days</figcaption>
        </figure>
        <figure>
          <div className="memory-mobile-image memory-mobile-image--now" />
          <figcaption>Now · a different chapter</figcaption>
        </figure>
      </div>
    </div>
  );
}

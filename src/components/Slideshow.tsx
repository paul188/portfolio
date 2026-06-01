'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import ClickableImage from '@/components/ClickableImage';

interface Props {
  images: string[];
  alts?: string[];
  interval?: number; // ms between slides, default 3000
}

export default function Slideshow({ images, alts = [], interval = 3000 }: Props) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((next: number) => {
    setFade(false);
    setTimeout(() => {
      setIdx(next);
      setFade(true);
    }, 220);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => goTo((idx + 1) % images.length), interval);
    return () => clearTimeout(timer);
  }, [idx, interval, images.length, goTo]);

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Main image */}
      <div style={{
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.22s ease',
        borderRadius: '12px', overflow: 'hidden',
      }}>
        <ClickableImage
          src={images[idx]}
          alt={alts[idx] ?? `Slide ${idx + 1}`}
        />
      </div>

      {/* Prev / next arrows */}
      <button
        onClick={() => goTo((idx - 1 + images.length) % images.length)}
        aria-label="Previous"
        style={{
          position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.55)', border: 'none', color: '#fff',
          width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
          fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ‹
      </button>
      <button
        onClick={() => goTo((idx + 1) % images.length)}
        aria-label="Next"
        style={{
          position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.55)', border: 'none', color: '#fff',
          width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
          fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px',
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === idx ? '20px' : '6px', height: '6px',
              borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
              background: i === idx ? '#FE1EFA' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

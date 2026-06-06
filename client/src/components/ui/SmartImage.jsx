import React, { useState } from 'react';

export default function SmartImage({
  src,
  alt,
  className = '',
  fallbackSeed = 'nature',
  width = 800,
  height = 600,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackSrc = `https://picsum.photos/seed/${fallbackSeed}/${width}/${height}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A6B] via-[#243580] to-[#1B2A6B] animate-shimmer" />
      )}

      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        className={`
          w-full h-full object-cover
          transition-opacity duration-700 ease-out
          ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}

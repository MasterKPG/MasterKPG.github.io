import { useState } from 'react'

/**
 * Cover image on a plain surface. If the file fails to load, the surface stays empty
 * instead of showing a broken image.
 */
export function CoverImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`relative overflow-hidden bg-[rgb(var(--bg-elevated))] ${className}`}>
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="h-full w-full object-cover transition-transform duration-700"
        />
      )}
    </div>
  )
}

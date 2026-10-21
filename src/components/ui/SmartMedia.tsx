import { useState } from 'react'

/**
 * Cover image that falls back to a CSS gradient when the file is absent
 * (so the build/preview never shows a broken image before media is dropped in).
 */
export function CoverImage({
  src,
  grad,
  alt,
  className = '',
  onStatus,
}: {
  src: string
  grad: string
  alt: string
  className?: string
  /** Called once the image has loaded (true) or failed (false). */
  onStatus?: (ok: boolean) => void
}) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: grad }}>
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => onStatus?.(true)}
          onError={() => {
            setOk(false)
            onStatus?.(false)
          }}
          className="h-full w-full object-cover transition-transform duration-700"
        />
      )}
      {!ok && (
        <div aria-hidden className="absolute inset-0 opacity-40 mix-blend-overlay noise" />
      )}
    </div>
  )
}

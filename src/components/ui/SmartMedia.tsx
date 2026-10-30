import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Cover image on a plain surface. If the file fails to load, the surface stays empty
 * instead of showing a broken image.
 */
export function CoverImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}) {
  const [ok, setOk] = useState(true)
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)}>
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setOk(false)}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      )}
    </div>
  )
}

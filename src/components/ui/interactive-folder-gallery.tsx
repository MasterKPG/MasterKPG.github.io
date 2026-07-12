import { useState } from "react"
import { motion } from "framer-motion"
import { CoverImage } from "./SmartMedia"

/**
 * Source: 21st.dev @uithefactory/interactive-folder-gallery, adapted:
 * - `bg-linear-to-*` (Tailwind v4 syntax) → `bg-gradient-to-*` (this project runs Tailwind v3.4)
 * - flat `image: string` photos → { image, grad } so covers fall back to a gradient via
 *   our existing CoverImage component instead of ever showing a broken <img>
 * - fan/stack offset math generalized from a hardcoded 5-photo assumption (`i - 2`) to
 *   `i - (photos.length - 1) / 2` so it centers correctly for any photo count
 * - added an `onOpen` callback per photo (fired on click, not on drag) so a photo can open
 *   something (here, the project detail modal) instead of just being a draggable image
 * - added minimal keyboard/aria affordances to the (originally div-only) folder trigger
 */

export interface GalleryPhoto {
  id: string | number
  image: string
  grad?: string
  label?: string
  featured?: boolean
  onOpen?: () => void
}

export interface InteractiveFolderGalleryProps {
  photos: GalleryPhoto[]
  folderName?: string
  dragHintText?: string
  className?: string
}

export function InteractiveFolderGallery({
  photos,
  folderName = "Projects",
  dragHintText = "Drag any card down to close",
  className,
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [hoverFolder, setHoverFolder] = useState(false)
  const [hoveredId, setHoveredId] = useState<GalleryPhoto["id"] | null>(null)
  const mid = (photos.length - 1) / 2
  // Cards overlap when fanned/opened (by design — see stackX/openX below), so a card's
  // caption would get covered by the next one's opaque edge. Only reveal it on hover,
  // when Framer also bumps that card's z-index above its neighbors.
  const openSpread = Math.min(150, 900 / Math.max(photos.length - 1, 1))

  return (
    <div className={`relative w-full py-20 ${className ?? ""}`}>
      <div className="relative flex min-h-[480px] w-full flex-col items-center justify-center">
        <div className="relative flex h-[420px] w-full max-w-[900px] justify-center pointer-events-none">
          {/* folder back */}
          <motion.div
            className="absolute bottom-6 h-52 w-72 drop-shadow-2xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
          >
            <div className="absolute left-0 top-0 h-9 w-28 rounded-t-xl border-l border-r border-t border-white/10 bg-gradient-to-t from-ink-700 to-ink-600" />
            <div className="absolute inset-x-0 bottom-0 top-7 rounded-b-xl rounded-tr-xl border border-white/10 bg-gradient-to-b from-ink-700 to-ink-950 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
          </motion.div>

          {/* fanned / stacked photos */}
          <div className="absolute bottom-9 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - mid
              const stackY = hoverFolder ? offset * -8 - 32 : offset * -4
              const stackX = hoverFolder ? offset * 24 : offset * 3
              const stackRotate = hoverFolder ? offset * 6 : offset * 2.5
              const stackScale = 1 - Math.abs(offset) * 0.025

              const openY = -120
              const openX = offset * openSpread
              const openScale = 1.02

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen}
                  dragSnapToOrigin
                  onDragEnd={(_e, info) => {
                    if (info.offset.y > 100 && isFolderOpen) {
                      setIsFolderOpen(false)
                      setHoverFolder(false)
                    }
                  }}
                  onClick={() => isFolderOpen && photo.onOpen?.()}
                  onHoverStart={() => setHoveredId(photo.id)}
                  onHoverEnd={() => setHoveredId((h) => (h === photo.id ? null : h))}
                  className={`absolute bottom-0 h-64 w-48 origin-bottom overflow-hidden rounded-xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${
                    isFolderOpen
                      ? "cursor-pointer pointer-events-auto active:cursor-grabbing"
                      : "pointer-events-none"
                  }`}
                  animate={
                    !isFolderOpen
                      ? { y: stackY, x: stackX, rotate: stackRotate, scale: stackScale, zIndex: i + 10 }
                      : { y: openY, x: openX, rotate: 0, scale: openScale, zIndex: 50 }
                  }
                  whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100, y: openY - 8 } : {}}
                  whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <CoverImage
                    src={photo.image}
                    grad={photo.grad ?? "linear-gradient(135deg,#0a0f14,#10161d)"}
                    alt={photo.label ?? ""}
                    className="pointer-events-none h-full w-full"
                  />
                  {photo.featured && (
                    <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-ink-950">
                      ★
                    </span>
                  )}
                  {/* Cards overlap when fanned, so only reveal the caption for the hovered
                      (z-index-boosted) card — otherwise its text would sit under the next card. */}
                  {photo.label && isFolderOpen && hoveredId === photo.id && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2.5">
                      <p className="line-clamp-2 text-xs font-semibold text-white">{photo.label}</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* front flap / folder trigger */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-expanded={isFolderOpen}
            aria-label={folderName}
            className="pointer-events-auto absolute bottom-0 z-20 h-40 w-[300px] cursor-pointer drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
            style={{ transformOrigin: "bottom" }}
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              rotateX: hoverFolder ? -22 : 0,
              y: hoverFolder ? 8 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto",
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsFolderOpen(true)}
          >
            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-ink-700 to-ink-950 pb-7 shadow-[inset_0_2px_10px_rgba(255,255,255,0.06)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="flex items-center justify-center rounded-lg border border-black/60 bg-black/60 px-5 py-2.5 shadow-inner backdrop-blur-md">
                <span className="text-sm font-medium tracking-wide text-white/90">{folderName}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 40 }}
          className="pointer-events-none absolute bottom-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/50 backdrop-blur-md"
        >
          {dragHintText}
        </motion.div>

        {isFolderOpen && (
          <button
            onClick={() => setIsFolderOpen(false)}
            className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-[rgb(var(--fg))]"
          >
            close
          </button>
        )}
      </div>
    </div>
  )
}

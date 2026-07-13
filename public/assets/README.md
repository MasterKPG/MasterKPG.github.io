# Drop in media

Files placed here are served at the site root and picked up automatically, with no code changes
needed. Use the project **id** (from `src/lib/content.ts`) as the filename.

Project ids: `arduino-clone`, `ping-pong`, `adder`, `connected-plant`, `tipe-sailboat`,
`ml-clustering`, `weather-api`, `dll-injection`, `ascii-art`.

## Covers → `covers/<id>.webp`

The cover image shown on the project card and at the top of the preview modal. Until a file
exists, an animated gradient is shown instead, so nothing ever looks broken.

Any 16:9 image works (`.webp`, `.jpg`, `.png`); keep the `.webp` name or update the `cover` field
in `content.ts`.

## Videos → `videos/<id>.mp4`

Drop an MP4 and the preview modal will autoplay it in place of the cover and show a "Watch demo"
button. Referenced by the `video` field in `content.ts`.

## Documents → `docs/<id>.pdf`

PDFs/slides linked from the preview modal via the `docs` field in `content.ts`
(e.g. `docs/arduino-clone.pdf`, `docs/adder.pdf`).

// Fetches the last year of public GitHub contributions for the activity section and
// writes public/contributions.json. Runs before `dev` and `build`. Any failure is only a
// warning: the previous file (if any) is kept, and without one the section hides itself.
import { writeFile } from 'node:fs/promises'

const USER = 'MasterKPG'
const OUT = new URL('../public/contributions.json', import.meta.url)

try {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const days = (json.contributions ?? []).map(({ date, count }) => ({ date, count }))
  if (!days.length) throw new Error('no days in response')
  await writeFile(OUT, JSON.stringify({ user: USER, days }))
  console.log(`contributions: ${days.length} days for ${USER}`)
} catch (err) {
  console.warn(`contributions: skipped (${err.message})`)
}

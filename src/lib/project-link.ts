/** Hash that opens a project's preview on the portfolio, e.g. #project-solibox. */
export const projectHash = (id: string) => `#project-${id}`

/** The project id in the current hash, if there is one. */
export const projectFromHash = () => window.location.hash.match(/^#project-(.+)$/)?.[1]

/** Opens a project's preview by setting the hash; the Projects section listens for it. */
export function openProject(id: string) {
  window.location.hash = projectHash(id)
}

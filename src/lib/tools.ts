import {
  siArduino,
  siArm,
  siC,
  siCss,
  siDebian,
  siExpo,
  siFlask,
  siFramer,
  siGit,
  siGithub,
  siGunicorn,
  siHtml5,
  siJavascript,
  siLinux,
  siNextdotjs,
  siNginx,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPython,
  siRaspberrypi,
  siReact,
  siRust,
  siScipy,
  siSupabase,
  siTypescript,
  siUbuntu,
} from 'simple-icons'

export interface Tool {
  label: string
  /** SVG path on a 24px grid, from simple-icons. */
  path: string
}

const tool = (label: string, icon: { path: string }): Tool => ({ label, path: icon.path })

/** The tools from the skill list that have a recognisable logo, for the ribbon under the hero. */
export const TOOLS: Tool[] = [
  tool('C', siC),
  tool('Python', siPython),
  tool('Rust', siRust),
  tool('TypeScript', siTypescript),
  tool('JavaScript', siJavascript),
  tool('Java', siOpenjdk),
  tool('ARM Cortex-M', siArm),
  tool('Arduino', siArduino),
  tool('Raspberry Pi', siRaspberrypi),
  tool('Linux', siLinux),
  tool('Debian', siDebian),
  tool('Ubuntu', siUbuntu),
  tool('NGINX', siNginx),
  tool('Gunicorn', siGunicorn),
  tool('PostgreSQL', siPostgresql),
  tool('Flask', siFlask),
  tool('NumPy', siNumpy),
  tool('SciPy', siScipy),
  tool('pandas', siPandas),
  tool('React', siReact),
  tool('Next.js', siNextdotjs),
  tool('Expo', siExpo),
  tool('Supabase', siSupabase),
  tool('HTML', siHtml5),
  tool('CSS', siCss),
  tool('Framer', siFramer),
  tool('Git', siGit),
  tool('GitHub', siGithub),
]

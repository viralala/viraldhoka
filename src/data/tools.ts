import {
  siTypescript, siJavascript, siPython, siKotlin, siDart, siReact, siNextdotjs, siNodedotjs, siExpress,
  siFastapi, siFlutter, siTailwindcss, siGsap, siFramer, siThreedotjs, siWebgl, siPostgresql, siSupabase,
  siMongodb, siFirebase, siGooglegemini, siClaude, siScikitlearn, siPandas, siNumpy, siGit, siGithubactions,
  siVercel, siGradle, siVitest, siJest, siMysql,
} from 'simple-icons'

export type Tool = { name: string; path?: string; hex: string }
type Icon = { path: string; hex: string }
const t = (name: string, i?: Icon, hex?: string): Tool => ({ name, path: i?.path, hex: `#${hex ?? i?.hex ?? '1b2350'}` })

/** Collected from the package files across my GitHub repos; group names come from the language */
export const TOOLBOX: Tool[][] = [
  [t('TypeScript', siTypescript), t('JavaScript', siJavascript), t('Python', siPython), t('Kotlin', siKotlin), t('Dart', siDart), t('SQL', siMysql)],
  [t('React', siReact), t('Next.js', siNextdotjs), t('Node.js', siNodedotjs), t('Express', siExpress), t('FastAPI', siFastapi), t('Flutter', siFlutter), t('Tailwind CSS', siTailwindcss)],
  [t('GSAP', siGsap, '0ab83a'), t('Framer Motion', siFramer), t('Three.js', siThreedotjs), t('WebGL', siWebgl)],
  [t('PostgreSQL', siPostgresql), t('Supabase', siSupabase, '2fae72'), t('MongoDB', siMongodb), t('Firebase', siFirebase)],
  [t('Gemini API', siGooglegemini), t('Claude API', siClaude), t('scikit-learn', siScikitlearn), t('pandas', siPandas), t('NumPy', siNumpy)],
  [t('Git', siGit), t('GitHub Actions', siGithubactions), t('Vercel', siVercel), t('Gradle', siGradle)],
  [t('Vitest', siVitest, '17a34a'), t('Jest', siJest), t('Playwright', undefined, '2ead33')],
]

/** The sixteen the pixel dust draws, in a 4 by 4 grid */
export const DUST_ICONS: Tool[] = [
  'TypeScript', 'JavaScript', 'Python', 'React',
  'Next.js', 'Node.js', 'FastAPI', 'Tailwind CSS',
  'GSAP', 'Three.js', 'PostgreSQL', 'Supabase',
  'Firebase', 'Gemini API', 'Claude API', 'GitHub Actions',
].map((n) => TOOLBOX.flat().find((x) => x.name === n)!)

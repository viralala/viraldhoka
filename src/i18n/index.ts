import { useSyncExternalStore } from 'react'
import en, { type Dict } from './en'

export type Lang = 'en' | 'hi' | 'mr' | 'de' | 'es' | 'zh' | 'fr' | 'ja'

/** Each language is listed in its own script, so anyone can find theirs. */
export const LANGS: { id: Lang; name: string; short: string; locale: string }[] = [
  { id: 'en', name: 'English', short: 'EN', locale: 'en-IN' },
  { id: 'hi', name: 'हिन्दी', short: 'हि', locale: 'hi-IN' },
  { id: 'mr', name: 'मराठी', short: 'म', locale: 'mr-IN-u-nu-latn' },
  { id: 'de', name: 'Deutsch', short: 'DE', locale: 'de-DE' },
  { id: 'es', name: 'Español', short: 'ES', locale: 'es-ES' },
  { id: 'zh', name: '中文', short: '中', locale: 'zh-CN' },
  { id: 'fr', name: 'Français', short: 'FR', locale: 'fr-FR' },
  { id: 'ja', name: '日本語', short: '日', locale: 'ja-JP' },
]

const loaders: Record<Exclude<Lang, 'en'>, () => Promise<{ default: Dict }>> = {
  hi: () => import('./hi'),
  mr: () => import('./mr'),
  de: () => import('./de'),
  es: () => import('./es'),
  zh: () => import('./zh'),
  fr: () => import('./fr'),
  ja: () => import('./ja'),
}

const KEY = 'vd-lang'
const cache: Partial<Record<Lang, Dict>> = { en }
let lang: Lang = 'en'
let dict: Dict = en
const listeners = new Set<() => void>()

const isLang = (x: unknown): x is Lang => LANGS.some((l) => l.id === x)

/** A saved choice wins, then the browser's language if we have it, then English. */
export function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (isLang(saved)) return saved
  } catch {
    // Storage can be blocked; the browser language still works
  }
  for (const l of navigator.languages ?? [navigator.language]) {
    const base = l.toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }
  return 'en'
}

async function load(l: Lang) {
  if (!cache[l]) cache[l] = (await loaders[l as Exclude<Lang, 'en'>]()).default
  return cache[l]!
}

/** Chinese and Japanese read best in a real CJK serif, fetched only when needed. */
function cjkFonts(l: Lang) {
  if ((l !== 'zh' && l !== 'ja') || document.getElementById('cjk-fonts')) return
  const link = document.createElement('link')
  link.id = 'cjk-fonts'
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&family=Noto+Serif+SC:wght@400;500&display=swap'
  document.head.appendChild(link)
}

function apply(l: Lang, d: Dict) {
  lang = l
  dict = d
  document.documentElement.lang = l
  document.title = d.meta.title
  cjkFonts(l)
  listeners.forEach((f) => f())
}

export async function setLang(l: Lang) {
  const d = await load(l)
  try {
    localStorage.setItem(KEY, l)
  } catch {
    // Not saved, but the page still switches
  }
  apply(l, d)
}

/** Loads the starting language before the first paint, so nothing flashes in English. */
export async function bootLang() {
  const l = initialLang()
  try {
    apply(l, await load(l))
  } catch {
    apply('en', en)
  }
}

const subscribe = (f: () => void) => {
  listeners.add(f)
  return () => listeners.delete(f)
}

export const getLang = () => lang
export const getDict = () => dict
export const getLocale = () => LANGS.find((l) => l.id === lang)!.locale
export const onLang = subscribe

export function useLang() {
  return useSyncExternalStore(subscribe, getLang)
}

export function useT() {
  return useSyncExternalStore(subscribe, getDict)
}

export const fmtNum = (n: number) => Math.round(n).toLocaleString(getLocale())

/** Chinese and Japanese have no spaces, so motion splits them by character instead. */
const CJK = /[぀-ヿ㐀-鿿＀-￯]/
const PUNCT = /^[、。，．！？：；）」』,.!?:;)]$/
export function splitWords(text: string): { parts: string[]; joiner: string } {
  if (!CJK.test(text)) return { parts: text.split(' '), joiner: ' ' }
  const parts: string[] = []
  for (const ch of Array.from(text)) {
    if (ch === ' ') continue
    if (parts.length && PUNCT.test(ch)) parts[parts.length - 1] += ch
    else parts.push(ch)
  }
  return { parts, joiner: '' }
}

/** A project with its words in the current language. */
export function localProject<P extends { id: string; stack: string[] }>(p: P, d: Dict) {
  return { ...p, ...d.projects[p.id], stack: p.stack.map((s) => d.stack[s] ?? s) }
}
export type LocalProject = ReturnType<typeof localProject<import('../data/site').Project>>

/** Month names come from the browser, so they are right in every language. */
export const monthName = (m: number, opts: Intl.DateTimeFormatOptions = { month: 'short' }) =>
  new Intl.DateTimeFormat(getLocale(), { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(2026, m - 1, 15)))

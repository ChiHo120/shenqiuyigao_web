import type { Database } from '../types/database'

export type NewsRow = Database['public']['Tables']['news']['Row']
export type NoticeRow = Database['public']['Tables']['notices']['Row']
export type NoticeDisplay = NoticeRow & { local_link?: string }

export const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

interface LocalNewsOverlay {
  custom: any[]
  edits: Record<string, any>
  deleted: Set<string>
}

const getLocalNewsOverlay = (): LocalNewsOverlay => ({
  custom: readStorage<any[]>('sqyg_demo_customNews', []),
  edits: readStorage<Record<string, any>>('sqyg_demo_editedNews', {}),
  deleted: new Set(readStorage<string[]>('sqyg_demo_deletedNewsIds', [])),
})

const applyOverlay = (item: any, edits: Record<string, any>) =>
  edits[String(item.id)] ? { ...item, ...edits[String(item.id)] } : item

export const mergeNewsWithLocal = (base: any[]): NewsRow[] => {
  const { custom, edits, deleted } = getLocalNewsOverlay()
  const merged = [
    ...custom
      .filter((i: any) => !deleted.has(String(i.id)))
      .map((i: any) => applyOverlay(i, edits)),
    ...(base || [])
      .filter((i: any) => !deleted.has(String(i.id)))
      .map((i: any) => applyOverlay(i, edits)),
  ]
  merged.sort(
    (a: any, b: any) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  )
  return merged as NewsRow[]
}

export const mergeNoticesWithLocal = (base: any[]): NoticeDisplay[] => {
  const { custom, edits, deleted } = getLocalNewsOverlay()
  const localNotices = custom
    .filter((i: any) => !deleted.has(String(i.id)))
    .map((i: any) => applyOverlay(i, edits))
    .map((i: any) => ({
      id: i.id,
      title: i.title,
      content: i.content,
      publish_date: i.publish_date,
      is_pinned: false,
      priority: 2,
      views: 0,
      local_link: `/news/${i.id}`,
    }))
  const merged = [
    ...localNotices,
    ...(base || [])
      .filter((i: any) => !deleted.has(String(i.id)))
      .map((i: any) => applyOverlay(i, edits)),
  ]
  merged.sort(
    (a: any, b: any) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  )
  return merged as NoticeDisplay[]
}

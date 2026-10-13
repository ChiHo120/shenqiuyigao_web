export interface News {
  id: number
  title: string
  content: string
  category: string
  category_id?: number
  publish_date: string
  author: string
  image_url: string | null
  is_published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface NewsCategory {
  id: number
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: number
  title: string
  content: string
  publish_date: string
  priority: number
  is_pinned: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: number
  name: string
  title: string
  subject: string
  department: string
  education: string
  achievements: string
  avatar_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CampusImage {
  id: number
  title: string
  description: string
  image_url: string
  category: string
  upload_date: string
  is_published: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface Video {
  id: number
  title: string
  description: string
  cover_url: string | null
  video_url: string | null
  duration: string
  published_at: string
  is_published: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface Honor {
  id: number
  title: string
  description: string
  year: number
  level: string
  image_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface SchoolPage {
  id: number
  slug: string
  title: string
  content: string
  meta_title: string
  meta_description: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface StudentActivity {
  id: number
  title: string
  description: string
  date: string
  images: string[]
  category: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface SchoolStat {
  id: number
  stat_name: string
  stat_value: string
  description: string
  created_at: string
  updated_at: string
}

export type CategoryType = 'campus' | 'teaching' | 'achievement' | 'teacher' | 'competition'

export type HonorLevel = 'national' | 'provincial' | 'municipal' | 'county'
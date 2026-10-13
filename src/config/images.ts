export interface ImageConfig {
  category: string
  placeholder: string
  fallback: string
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/4'
}

export const imageConfigs: Record<string, ImageConfig> = {
  hero: {
    category: 'hero',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '16/9',
  },
  campus: {
    category: 'campus',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '4/3',
  },
  news: {
    category: 'news',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '16/9',
  },
  teacher: {
    category: 'teacher',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '1/1',
  },
  activity: {
    category: 'activity',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '4/3',
  },
  history: {
    category: 'history',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '4/3',
  },
  honor: {
    category: 'honor',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '16/9',
  },
  gallery: {
    category: 'gallery',
    placeholder: '/images/placeholder.svg',
    fallback: '/images/placeholder.svg',
    aspectRatio: '4/3',
  },
}

export const getImageConfig = (category: string): ImageConfig => {
  return imageConfigs[category] || imageConfigs.campus
}

export const categories = Object.keys(imageConfigs)
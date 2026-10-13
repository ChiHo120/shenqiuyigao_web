import { useEffect, useState } from 'react'
import HeroBanner from '../components/home/HeroBanner'
import NoticeCard from '../components/home/NoticeCard'
import NewsCard from '../components/home/NewsCard'
import { Link } from 'react-router-dom'
import { Bell, Camera, GraduationCap, Map, Newspaper, Phone, PlayCircle, School } from 'lucide-react'
import PhilosophyCard from '../components/home/PhilosophyCard'
import GalleryCard from '../components/home/GalleryCard'
import CampusMap from '../components/home/CampusMap'
import { getNotices, getNews, getGallery } from '../api/supabase'
import type { Database } from '../../types/database'
import { mergeNewsWithLocal, mergeNoticesWithLocal, type NoticeDisplay } from '../utils/localContent'

const quickLinks = [
  { title: '招生信息', path: '/admissions', icon: GraduationCap },
  { title: '通知公告', path: '/announcements', icon: Bell },
  { title: '校园动态', path: '/news', icon: Newspaper },
  { title: '历年毕业生', path: '/graduates', icon: School },
  { title: '校园照片', path: '/campus', icon: Camera },
  { title: '校园视频', path: '/videos', icon: PlayCircle },
  { title: '校园地图', path: '/#campus-map', icon: Map },
  { title: '联系我们', path: '/contact', icon: Phone },
]

export default function Home() {
  const [notices, setNotices] = useState<NoticeDisplay[]>([])
  const [news, setNews] = useState<Database['public']['Tables']['news']['Row'][]>([])
  const [gallery, setGallery] = useState<Database['public']['Tables']['gallery']['Row'][]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [noticeRes, newsRes, galleryRes] = await Promise.all([
          getNotices(),
          getNews(),
          getGallery(),
        ])
        setNotices(mergeNoticesWithLocal(noticeRes.data || []))
        setNews(mergeNewsWithLocal(newsRes.data || []))
        setGallery(galleryRes.data || [])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="animate-fadeIn">
      <HeroBanner />
      
      <main className="max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 -mt-10 md:-mt-16 relative z-20">
        <section className="bg-white border-t-[5px] border-school-red shadow-[0_18px_55px_rgba(0,0,0,0.14)] px-6 py-7 md:px-10 md:py-9" aria-labelledby="quick-links-title">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-school-red mb-2">Quick Access</p>
              <h2 id="quick-links-title" className="text-2xl md:text-3xl font-bold text-gray-900">常用入口</h2>
            </div>
            <span className="hidden md:block w-24 h-px bg-gray-300" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex flex-col items-center justify-center gap-2 min-h-24 border-r border-gray-100 last:border-r-0 text-gray-700 hover:text-school-red hover:bg-red-50/60 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              )
            })}
          </div>
        </section>

        <div className="mt-8" aria-live="polite" aria-busy={loading}>
          {loading ? (
            <div className="py-16 flex items-center justify-center" aria-label="正在加载校园动态和通知公告">
              <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <NewsCard news={news} />
              </div>
              <div>
                <NoticeCard notices={notices} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <PhilosophyCard />
        </div>

        <div className="mt-8">
          <GalleryCard gallery={gallery} />
        </div>

        <div id="campus-map" className="mt-16 md:mt-24 scroll-mt-24">
          <CampusMap />
        </div>
      </main>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Pin, AlertCircle, Eye } from 'lucide-react'
import { getAnnouncementById } from '../services/announcements'

export const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [announcement, setAnnouncement] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getAnnouncementById(parseInt(id || '0')).then(({ data }) => {
      setAnnouncement(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">通知不存在</p>
            <Link to="/announcements" className="text-school-red hover:underline mt-4 inline-block">
              返回通知列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/announcements" className="flex items-center gap-2 text-gray-600 hover:text-school-red transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回通知列表</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                {announcement.is_pinned ? (
                  <Pin className="w-5 h-5 text-school-red" />
                ) : announcement.priority === 1 ? (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                ) : null}
                {announcement.is_pinned && (
                  <span className="px-3 py-1 bg-school-red text-white text-sm rounded-full">
                    置顶
                  </span>
                )}
                {announcement.priority === 1 && !announcement.is_pinned && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
                    紧急
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(announcement.publish_date).toLocaleDateString('zh-CN')}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-6">{announcement.title}</h1>

              <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                <Eye className="w-4 h-4" />
                <span>{announcement.views || 0} 阅读</span>
              </div>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p>{announcement.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDetail
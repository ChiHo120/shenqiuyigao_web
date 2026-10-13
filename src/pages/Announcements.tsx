import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Calendar, Pin, AlertCircle, Eye } from 'lucide-react'
import { getAnnouncements } from '../services/announcements'
import type { Announcement } from '../services/announcements'

export const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true)
      try {
        const { data } = await getAnnouncements(50)
        setAnnouncements(data)
      } catch (error) {
        console.error('加载通知公告失败:', error)
        setAnnouncements([])
      } finally {
        setLoading(false)
      }
    }

    loadAnnouncements()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-school-red text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-10 h-10" />
            <h1 className="text-4xl font-bold">通知公告</h1>
          </div>
          <p className="text-red-100 text-lg">及时了解学校最新通知和重要公告</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">暂无通知公告</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {announcements.map((item) => (
                <Link
                  key={item.id}
                  to={`/announcements/${item.id}`}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {item.is_pinned ? (
                        <Pin className="w-6 h-6 text-school-red" />
                      ) : item.priority === 1 ? (
                        <AlertCircle className="w-6 h-6 text-orange-500" />
                      ) : (
                        <Bell className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {item.is_pinned && (
                          <span className="px-2 py-0.5 bg-school-red text-white text-xs rounded">
                            置顶
                          </span>
                        )}
                        {item.priority === 1 && !item.is_pinned && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded">
                            紧急
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-school-red transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-4 text-gray-400 text-sm mt-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.publish_date
                            ? new Date(item.publish_date).toLocaleDateString('zh-CN')
                            : '日期待补充'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Announcements
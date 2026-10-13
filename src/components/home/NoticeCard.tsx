import { Bell, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { NoticeDisplay } from '../../utils/localContent'

interface NoticeCardProps {
  notices: NoticeDisplay[]
}

export default function NoticeCard({ notices }: NoticeCardProps) {
  return (
    <section className="bg-white border border-gray-100 rounded-lg p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-school-red" />
          <h2 className="text-xl font-bold text-gray-800">通知公告</h2>
        </div>
        <Link to="/announcements" className="text-sm text-school-red hover:text-red-700 flex items-center space-x-1">
          <span>查看更多</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {notices.length === 0 && (
        <p className="py-12 text-center text-sm text-gray-500">暂无已发布的通知公告</p>
      )}
      <ul>
        {notices.slice(0, 6).map((notice) => {
          const date = new Date(notice.publish_date!)
          return (
            <li key={notice.id} className="border-t border-gray-100 first:border-t-0">
              <Link to={notice.local_link || `/announcements/${notice.id}`} className="flex items-start gap-5 py-5 group">
                <time className="w-14 flex-shrink-0 text-center text-gray-500 border-r border-gray-200 pr-4">
                  <span className="block text-2xl font-semibold leading-none text-gray-800">{String(date.getDate()).padStart(2, '0')}</span>
                  <span className="block text-xs mt-1">{date.getFullYear()}.{String(date.getMonth() + 1).padStart(2, '0')}</span>
                </time>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.is_pinned && <span className="text-xs px-2 py-0.5 bg-red-50 text-school-red rounded">置顶</span>}
                  </div>
                  <span className="text-gray-800 group-hover:text-school-red font-medium line-clamp-2 transition-colors">
                    {notice.title}
                  </span>
                  {notice.content && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notice.content}</p>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
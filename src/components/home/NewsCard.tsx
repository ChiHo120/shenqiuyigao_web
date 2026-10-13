import { Newspaper, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Database } from '../../../types/database'

interface NewsCardProps {
  news: Database['public']['Tables']['news']['Row'][]
}

export default function NewsCard({ news }: NewsCardProps) {
  const visibleNews = news.slice(0, 6)
  const featuredNews = visibleNews[0]
  const remainingNews = visibleNews.slice(1)

  return (
    <section className="bg-white border border-gray-100 rounded-lg p-5 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-school-red" />
          <h2 className="text-xl font-bold text-gray-800">最新动态</h2>
        </div>
        <Link to="/news" className="text-sm text-school-red hover:text-red-700 flex items-center space-x-1">
          <span>查看更多</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {!featuredNews && (
        <p className="py-12 text-center text-sm text-gray-500">暂无已发布的校园动态</p>
      )}

      {featuredNews && (
        <Link to={`/news/${featuredNews.id}`} className="group block mb-5">
          <div className="aspect-[16/8] bg-gray-100 rounded-md overflow-hidden mb-3">
            <img
              src={featuredNews.image_url || '/images/placeholder.svg'}
              alt={featuredNews.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <h3 className="text-lg font-bold leading-snug text-gray-800 group-hover:text-school-red line-clamp-2 transition-colors">
            {featuredNews.title}
          </h3>
          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{new Date(featuredNews.publish_date!).toLocaleDateString('zh-CN')}</span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        {remainingNews.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} className="flex items-start gap-3 py-3 border-t border-gray-100 group">
            <div className="flex-shrink-0 w-24 h-16 bg-gray-100 rounded overflow-hidden">
              <img src={item.image_url || '/images/placeholder.svg'} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="text-gray-800 group-hover:text-school-red font-medium text-sm line-clamp-2 transition-colors block">
                {item.title}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date(item.publish_date!).toLocaleDateString('zh-CN')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
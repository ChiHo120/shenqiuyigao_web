import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Eye, Share2, ExternalLink } from 'lucide-react'
import Image from '../components/common/Image'
import { getNewsById, getNews } from '../services/news'

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<any>(null)
  const [relatedNews, setRelatedNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const newsId = parseInt(id || '0')

    let deleted: Set<string> = new Set()
    let edits: Record<string, any> = {}
    try {
      deleted = new Set<string>(JSON.parse(localStorage.getItem('sqyg_demo_deletedNewsIds') || '[]'))
      edits = JSON.parse(localStorage.getItem('sqyg_demo_editedNews') || '{}')
    } catch {
      deleted = new Set()
      edits = {}
    }

    const resolveItem = (item: any) => {
      if (!item) return null
      if (deleted.has(String(item.id))) return null
      return edits[String(item.id)] ? { ...item, ...edits[String(item.id)] } : item
    }

    const handleResults = ([newsResult, relatedResult]: any[]) => {
      setNews(resolveItem(newsResult?.data ?? null))
      setRelatedNews(
        (relatedResult?.data || []).filter(
          (n: any) => n.id !== newsId && !deleted.has(String(n.id))
        )
      )
      setLoading(false)
    }

    const storedNews = localStorage.getItem('sqyg_demo_customNews')
    const customNews = storedNews ? JSON.parse(storedNews) : []
    const customNewsItem = customNews.find((n: any) => n.id === newsId)

    if (customNewsItem) {
      Promise.all([
        Promise.resolve({ data: customNewsItem }),
        getNews(5)
      ]).then(handleResults)
    } else {
      Promise.all([
        getNewsById(newsId),
        getNews(5)
      ]).then(handleResults)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">新闻不存在</p>
            <Link to="/news" className="text-school-red hover:underline mt-4 inline-block">
              返回新闻列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categoryLabels: Record<string, string> = {
    achievement: '教学成果',
    campus: '校园活动',
    teacher: '教师风采',
    teaching: '教育教学',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/news" className="flex items-center gap-2 text-gray-600 hover:text-school-red transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回新闻列表</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {news.image_url && (
              <Image
                src={news.image_url}
                alt={news.title}
                className="w-full"
                aspectRatio="16/9"
                lazy={false}
              />
            )}

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-school-red text-white text-sm rounded-full">
                  {categoryLabels[news.category] || news.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.publish_date).toLocaleDateString('zh-CN')}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <User className="w-4 h-4" />
                  {news.author}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-6">{news.title}</h1>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p>{news.content}</p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="flex items-center gap-1 text-gray-500">
                  <Eye className="w-4 h-4" />
                  {news.views || 0} 阅读
                </span>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>分享</span>
                </button>
                {news.external_url && (
                  <a
                    href={news.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-school-red text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>阅读原文</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {relatedNews.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">相关新闻</h2>
              <div className="space-y-4">
                {relatedNews.map((n: any) => (
                  <Link
                    key={n.id}
                    to={`/news/${n.id}`}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {n.image_url && (
                      <Image
                        src={n.image_url}
                        alt={n.title}
                        className="w-24 h-16 flex-shrink-0"
                        aspectRatio="4/3"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800 hover:text-school-red transition-colors">
                        {n.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(n.publish_date).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
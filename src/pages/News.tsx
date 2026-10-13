import { useEffect, useState } from 'react'
import { Newspaper, Clock, Tag, ArrowRight, Plus, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getNews } from '../api/supabase'
import AddNewsModal from '../components/common/AddNewsModal'
import EditNewsModal from '../components/common/EditNewsModal'
import DeleteNewsModal from '../components/common/DeleteNewsModal'
import { mergeNewsWithLocal, readStorage, type NewsRow } from '../utils/localContent'

export default function News() {
  const [news, setNews] = useState<NewsRow[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNews()
      setNews(mergeNewsWithLocal(res.data || []))
    }
    fetchData()
  }, [])

  const handleAddNews = (data: { image_url: string; title: string; publish_date: string; external_url: string; content: string }) => {
    const newNewsItem: any = {
      id: Date.now() as number,
      title: data.title,
      content: data.content || data.title,
      category: 'campus' as string | null,
      publish_date: new Date(data.publish_date).toISOString() as string | null,
      author: '管理员' as string | null,
      image_url: data.image_url as string | null,
      is_published: true as boolean | null,
      created_at: new Date().toISOString() as string | null,
      updated_at: new Date().toISOString() as string | null,
      external_url: data.external_url || null,
    }
    
    try {
      const storedNews = localStorage.getItem('sqyg_demo_customNews')
      const customNews = storedNews ? JSON.parse(storedNews) : []
      customNews.unshift(newNewsItem)
      localStorage.setItem('sqyg_demo_customNews', JSON.stringify(customNews))
      setNews([newNewsItem, ...news])
    } catch (error) {
      alert('存储空间不足，请使用较小图片或清理浏览器数据')
    }
  }

  const handleEditNews = (id: number | string, data: { image_url: string; title: string; publish_date: string; external_url: string; content: string }) => {
    const publishIso = new Date(data.publish_date).toISOString()
    const customNews = readStorage<any[]>('sqyg_demo_customNews', [])
    const index = customNews.findIndex((n) => n.id === id)
    try {
      if (index >= 0) {
        customNews[index] = {
          ...customNews[index],
          ...data,
          publish_date: publishIso,
          updated_at: new Date().toISOString(),
        }
        localStorage.setItem('sqyg_demo_customNews', JSON.stringify(customNews))
      } else {
        const edits = readStorage<Record<string, any>>('sqyg_demo_editedNews', {})
        edits[String(id)] = {
          ...data,
          publish_date: publishIso,
          updated_at: new Date().toISOString(),
        }
        localStorage.setItem('sqyg_demo_editedNews', JSON.stringify(edits))
      }
      setNews((prev) =>
        prev.map((n) =>
          n.id === id ? ({ ...n, ...data, publish_date: publishIso } as NewsRow) : n
        )
      )
    } catch (error) {
      alert('存储空间不足，请使用较小图片或清理浏览器数据')
    }
  }

  const handleDeleteNews = (id: number | string) => {
    const customNews = readStorage<any[]>('sqyg_demo_customNews', [])
    const index = customNews.findIndex((n) => n.id === id)
    if (index >= 0) {
      customNews.splice(index, 1)
      localStorage.setItem('sqyg_demo_customNews', JSON.stringify(customNews))
    } else {
      const deleted = readStorage<string[]>('sqyg_demo_deletedNewsIds', [])
      if (!deleted.includes(String(id))) {
        deleted.push(String(id))
        localStorage.setItem('sqyg_demo_deletedNewsIds', JSON.stringify(deleted))
      }
    }
    setNews((prev) => prev.filter((n) => n.id !== id))
  }

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'campus', label: '校园' },
    { key: 'achievement', label: '成果' },
    { key: 'teacher', label: '教师' },
  ]

  const filteredNews = (selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)).sort((a, b) => {
    return new Date(b.publish_date!).getTime() - new Date(a.publish_date!).getTime()
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">校园动态</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          了解沈丘一高的最新动态，关注校园新闻和活动。
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-school-red text-white rounded-xl hover:bg-red-700 transition-colors text-lg font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            添加动态
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-school-red text-school-red rounded-xl hover:bg-red-50 transition-colors text-lg font-medium"
          >
            <Pencil className="w-5 h-5 mr-2" />
            编辑动态
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            删除动态
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat.key
                ? 'bg-school-red text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.image_url || '/images/placeholder.svg'}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="px-2 py-1 bg-school-red/10 text-school-red text-xs rounded-full">
                  {item.category === 'campus' ? '校园动态' : item.category === 'achievement' ? '教学成果' : '教师风采'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-school-red transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(item.publish_date!).toLocaleDateString('zh-CN')}</span>
                </div>
                <span className="text-school-red hover:text-red-700 font-medium flex items-center space-x-1">
                  <span>阅读更多</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无相关新闻</p>
        </div>
      )}

      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNews}
      />

      <EditNewsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        newsList={news}
        onSave={handleEditNews}
      />

      <DeleteNewsModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        newsList={news}
        onDelete={handleDeleteNews}
      />
    </div>
  )
}
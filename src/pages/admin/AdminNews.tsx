﻿﻿﻿﻿﻿import { useState, useEffect } from 'react'
import { safeSupabase } from '../../lib/supabase'
import { mockNews } from '../../data/mockData'
import { FileText, Plus, Search, Trash2, Edit2, Eye, EyeOff } from 'lucide-react'

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    const { data } = await safeSupabase.from('news').select('*').order('publish_date', { ascending: false })
    setNews(data || mockNews)
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除吗？')) return
    const { error: err } = await safeSupabase.from('news').delete().eq('id', id)
    if (err) {
      setError('删除失败')
    } else {
      setSuccessMessage('删除成功')
      fetchNews()
    }
    setTimeout(() => { setError(''); setSuccessMessage('') }, 3000)
  }

  const handleTogglePublish = async (id: number, current: boolean) => {
    const { error: err } = await safeSupabase.from('news').update({ is_published: !current }).eq('id', id)
    if (err) {
      setError('更新失败')
    } else {
      setSuccessMessage('更新成功')
      fetchNews()
    }
    setTimeout(() => { setError(''); setSuccessMessage('') }, 3000)
  }

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">新闻动态管理</h1>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          <span>添加新闻</span>
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {successMessage && <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">{successMessage}</div>}

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索新闻标题..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">加载中...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {item.category === 'campus' ? '校园动态' : item.category === 'achievement' ? '教学成果' : item.category === 'teacher' ? '教师风采' : '其他'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.publish_date).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.is_published ? '已发布' : '未发布'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleTogglePublish(item.id, item.is_published)} className="text-blue-600 hover:text-blue-900 mr-3">
                      {item.is_published ? <Eye className="w-4 h-4 inline" /> : <EyeOff className="w-4 h-4 inline" />}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

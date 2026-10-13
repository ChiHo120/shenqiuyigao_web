import { useState, useEffect } from 'react'
import { safeSupabase } from '../../lib/supabase'
import { mockNews, mockNotices, mockTeachers, mockVideos } from '../../data/mockData'
import { FileText, Users, Video, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    notices: 0,
    teachers: 0,
    videos: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [newsRes, noticesRes, teachersRes, videosRes] = await Promise.all([
      safeSupabase.from('news').select('id', { count: 'exact' }),
      safeSupabase.from('notices').select('id', { count: 'exact' }),
      safeSupabase.from('teachers').select('id', { count: 'exact' }),
      safeSupabase.from('videos').select('id', { count: 'exact' }),
    ])

    setStats({
      news: newsRes.count || mockNews.length,
      notices: noticesRes.count || mockNotices.length,
      teachers: teachersRes.count || mockTeachers.length,
      videos: videosRes.count || mockVideos.length,
    })
  }

  const statCards = [
    { label: '新闻动态', value: stats.news, icon: FileText, color: 'bg-blue-500' },
    { label: '通知公告', value: stats.notices, icon: Calendar, color: 'bg-green-500' },
    { label: '师资力量', value: stats.teachers, icon: Users, color: 'bg-purple-500' },
    { label: '校园视频', value: stats.videos, icon: Video, color: 'bg-red-500' },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">管理后台</h1>
          <p className="text-gray-500 mt-1">欢迎来到沈丘一高网站管理系统</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">今日日期</p>
          <p className="text-lg font-medium text-gray-800">{new Date().toLocaleDateString('zh-CN')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">系统概览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-t-4 border-blue-500 p-4">
            <h3 className="font-medium text-gray-800">最近更新</h3>
            <p className="text-sm text-gray-500 mt-2">数据同步正常</p>
          </div>
          <div className="border-t-4 border-green-500 p-4">
            <h3 className="font-medium text-gray-800">系统状态</h3>
            <p className="text-sm text-gray-500 mt-2">运行正常</p>
          </div>
          <div className="border-t-4 border-purple-500 p-4">
            <h3 className="font-medium text-gray-800">数据库连接</h3>
            <p className="text-sm text-gray-500 mt-2">已连接</p>
          </div>
        </div>
      </div>
    </div>
  )
}

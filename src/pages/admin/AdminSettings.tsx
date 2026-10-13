import { useState, useEffect } from 'react'
import { safeSupabase } from '../../lib/supabase'
import { mockContactInfo } from '../../data/mockData'
import { Settings, Save, RefreshCw } from 'lucide-react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    schoolName: '沈丘县第一高级中学',
    schoolShortName: '沈丘一高',
    phone: mockContactInfo.phone,
    email: mockContactInfo.email,
    address: mockContactInfo.address,
    foundedYear: '1954',
    studentCount: '4360',
    teacherCount: '289',
    classCount: '52',
    campusArea: '436',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await safeSupabase.from('school_stats').select('*')
    if (data && data.length > 0) {
      const stats: any = {}
      data.forEach((item: any) => {
        if (item.stat_name === 'founded_year') stats.foundedYear = item.stat_value
        if (item.stat_name === 'students') stats.studentCount = item.stat_value
        if (item.stat_name === 'teachers') stats.teacherCount = item.stat_value
        if (item.stat_name === 'classes') stats.classCount = item.stat_value
        if (item.stat_name === 'campus_area') stats.campusArea = item.stat_value
      })
      setSettings(prev => ({ ...prev, ...stats }))
    }
  }

  const handleSave = async () => {
    const updates = [
      { stat_name: 'founded_year', stat_value: settings.foundedYear, description: '建校年份' },
      { stat_name: 'students', stat_value: settings.studentCount, description: '在校学生人数' },
      { stat_name: 'teachers', stat_value: settings.teacherCount, description: '教职工人数' },
      { stat_name: 'classes', stat_value: settings.classCount, description: '教学班数量' },
      { stat_name: 'campus_area', stat_value: settings.campusArea, description: '占地面积（亩）' },
    ]

    for (const update of updates) {
      const { error: err } = await safeSupabase.from('school_stats').upsert(update)
      if (err) {
        setError('保存失败')
        setTimeout(() => setError(''), 3000)
        return
      }
    }

    setSuccessMessage('保存成功')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-bold text-gray-800">网站配置</h1>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {successMessage && <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">{successMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">学校基本信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学校全称</label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) => setSettings(prev => ({ ...prev, schoolName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学校简称</label>
              <input
                type="text"
                value={settings.schoolShortName}
                onChange={(e) => setSettings(prev => ({ ...prev, schoolShortName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学校地址</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">学校统计数据</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">建校年份</label>
              <input
                type="text"
                value={settings.foundedYear}
                onChange={(e) => setSettings(prev => ({ ...prev, foundedYear: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">在校学生人数</label>
              <input
                type="text"
                value={settings.studentCount}
                onChange={(e) => setSettings(prev => ({ ...prev, studentCount: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">教职工人数</label>
              <input
                type="text"
                value={settings.teacherCount}
                onChange={(e) => setSettings(prev => ({ ...prev, teacherCount: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">教学班数量</label>
              <input
                type="text"
                value={settings.classCount}
                onChange={(e) => setSettings(prev => ({ ...prev, classCount: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">占地面积（亩）</label>
              <input
                type="text"
                value={settings.campusArea}
                onChange={(e) => setSettings(prev => ({ ...prev, campusArea: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="w-4 h-4" />
          <span>保存配置</span>
        </button>
        <button
          onClick={fetchSettings}
          className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>刷新数据</span>
        </button>
      </div>
    </div>
  )
}

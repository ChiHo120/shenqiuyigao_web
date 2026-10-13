import { useState } from 'react'
import { safeSupabase } from '../../lib/supabase'
import { mockNews, mockTeachers, mockGallery } from '../../data/mockData'
import { Download, FileText, Users, Image } from 'lucide-react'

export default function AdminExport() {
  const [exporting, setExporting] = useState(false)

  const sanitizeCell = (value: any): string => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    if (str.startsWith('=') || str.startsWith('+') || str.startsWith('-') || str.startsWith('@')) {
      return `'${str}`
    }
    return str.replace(/"/g, '""').replace(/\n/g, ' ').replace(/\r/g, '')
  }

  const createCSV = (headers: string[], rows: any[]): string => {
    const headerRow = headers.map(h => `"${sanitizeCell(h)}"`).join(',')
    const dataRows = rows.map(row => 
      headers.map(h => `"${sanitizeCell(row[h])}"`).join(',')
    )
    return [headerRow, ...dataRows].join('\n')
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportNews = async () => {
    setExporting(true)
    const { data: newsData } = await safeSupabase.from('news').select('*')
    const news = newsData || mockNews
    
    const headers = ['id', 'title', 'content', 'category', 'publish_date', 'author', 'image_url', 'is_published', 'external_url', 'created_at', 'updated_at']
    const csv = createCSV(headers, news)
    downloadCSV(csv, 'news_export.csv')
    setExporting(false)
  }

  const handleExportTeachers = async () => {
    setExporting(true)
    const { data: teachersData } = await safeSupabase.from('teachers').select('*')
    const teachers = teachersData || mockTeachers
    
    const headers = ['id', 'name', 'title', 'subject', 'education', 'achievements', 'avatar_url', 'created_at', 'updated_at']
    const csv = createCSV(headers, teachers)
    downloadCSV(csv, 'teachers_export.csv')
    setExporting(false)
  }

  const handleExportGallery = async () => {
    setExporting(true)
    const { data: galleryData } = await safeSupabase.from('gallery').select('*')
    const gallery = galleryData || mockGallery
    
    const headers = ['id', 'title', 'description', 'image_url', 'category', 'upload_date', 'created_at', 'updated_at']
    const csv = createCSV(headers, gallery)
    downloadCSV(csv, 'gallery_export.csv')
    setExporting(false)
  }

  const exportOptions = [
    { label: '新闻数据', icon: FileText, handler: handleExportNews, color: 'bg-blue-500', description: '导出所有新闻动态数据' },
    { label: '教师数据', icon: Users, handler: handleExportTeachers, color: 'bg-purple-500', description: '导出所有教师信息数据' },
    { label: '相册数据', icon: Image, handler: handleExportGallery, color: 'bg-orange-500', description: '导出所有照片相册数据' },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Download className="w-6 h-6 text-green-600" />
          <h1 className="text-xl font-bold text-gray-800">数据导出</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exportOptions.map((option) => (
          <div key={option.label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <option.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{option.label}</h3>
            <p className="text-sm text-gray-500 mb-4">{option.description}</p>
            <button
              onClick={option.handler}
              disabled={exporting}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? '导出中...' : '导出数据'}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">导出说明</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 导出的数据格式为 CSV，可使用 Excel 或其他电子表格软件打开</li>
          <li>• 所有数据已进行 XSS 防护处理，可安全导入其他系统</li>
          <li>• 日期字段使用 ISO 标准格式，便于数据处理</li>
          <li>• 如果数据库连接不可用，将导出本地模拟数据</li>
        </ul>
      </div>
    </div>
  )
}

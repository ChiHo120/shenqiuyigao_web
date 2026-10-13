import { useState, useEffect, useRef } from 'react'
import { X, Upload, Calendar, Image } from 'lucide-react'
import { compressImage } from '../../utils/image'

interface AddNewsModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { image_url: string; title: string; publish_date: string; external_url: string; content: string }) => void
}

export default function AddNewsModal({ isOpen, onClose, onAdd }: AddNewsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    publish_date: new Date().toISOString().split('T')[0],
    external_url: '',
    content: '',
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        image_url: '',
        title: '',
        publish_date: new Date().toISOString().split('T')[0],
        external_url: '',
        content: '',
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await compressImage(file)
        setFormData({ ...formData, image_url: base64 })
      } catch (error) {
        alert('图片压缩失败，请重试')
      }
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.image_url) {
      alert('请填写标题和图片')
      return
    }
    onAdd(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all"
        style={{ minWidth: '500px' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {(
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">添加校园动态</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  图片
                </label>
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="预览"
                      className="w-full h-40 object-contain border-2 border-gray-200 rounded-xl"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-school-red hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">点击选择本地图片</p>
                    <p className="text-gray-400 text-sm mt-1">支持 JPG、PNG 格式</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="输入新闻标题"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-school-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  发布时间
                </label>
                <input
                  type="date"
                  value={formData.publish_date}
                  onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-school-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">网址链接</label>
                <input
                  type="text"
                  value={formData.external_url}
                  onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                  placeholder="输入原文链接（可选）"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-school-red focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">内容摘要</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="输入新闻内容摘要"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-school-red focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-school-red text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

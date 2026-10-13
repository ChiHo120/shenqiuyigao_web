import { useState, useEffect, useRef } from 'react'
import { X, Upload, Image } from 'lucide-react'

interface AddPhotoModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { image_url: string }) => void
}

export default function AddPhotoModal({ isOpen, onClose, onAdd }: AddPhotoModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image_url, setImageUrl] = useState('')

  useEffect(() => {
    if (isOpen) {
      setImageUrl('')
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


  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new (window as any).Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
          
          canvas.width = width
          canvas.height = height
          
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            const base64 = canvas.toDataURL('image/jpeg', quality)
            resolve(base64)
          } else {
            reject(new Error('无法压缩图片'))
          }
        }
        img.onerror = reject
        img.src = event.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await compressImage(file)
        setImageUrl(base64)
      } catch (error) {
        alert('图片压缩失败，请重试')
      }
    }
  }

  const handleSubmit = () => {
    if (!image_url) {
      alert('请选择图片')
      return
    }
    onAdd({ image_url })
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">添加校园照片</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  照片
                </label>
                {image_url ? (
                  <div className="relative">
                    <img
                      src={image_url}
                      alt="预览"
                      className="w-full h-48 object-contain border-2 border-gray-200 rounded-xl"
                    />
                    <button
                      onClick={() => setImageUrl('')}
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

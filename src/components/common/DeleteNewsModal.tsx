import { useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import type { ManageNewsItem } from './EditNewsModal'

interface DeleteNewsModalProps {
  isOpen: boolean
  onClose: () => void
  newsList: ManageNewsItem[]
  onDelete: (id: number | string) => void
}

export default function DeleteNewsModal({ isOpen, onClose, newsList, onDelete }: DeleteNewsModalProps) {

  useEffect(() => {
    if (isOpen) {
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


  const handleDelete = (item: ManageNewsItem) => {
    if (window.confirm(`确定删除《${item.title}》吗？删除后不可恢复。`)) {
      onDelete(item.id)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all max-h-[90vh] overflow-y-auto"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">删除校园动态</h2>
            <p className="text-gray-500 text-sm mb-4 text-center">请选择要删除的动态</p>
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {newsList.map((item) => (
                <div
                  key={String(item.id)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl flex items-center gap-3"
                >
                  <img
                    src={item.image_url || '/images/placeholder.svg'}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-800 font-medium truncate">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {item.publish_date ? new Date(item.publish_date).toLocaleDateString('zh-CN') : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {newsList.length === 0 && (
                <p className="text-gray-400 text-center py-8">暂无可删除的动态</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

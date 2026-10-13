import { useEffect } from 'react'
import { X, ExternalLink, AlertTriangle } from 'lucide-react'

export interface ExternalTarget {
  label: string
  url: string
  note?: string
}

interface ExternalSiteModalProps {
  target: ExternalTarget | null
  onClose: () => void
}

export default function ExternalSiteModal({ target, onClose }: ExternalSiteModalProps) {
  useEffect(() => {
    if (!target) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [target, onClose])

  if (!target) return null

  const handleConfirm = () => {
    window.open(target.url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">温馨提示</h2>
        </div>

        <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
          <p>
            您即将前往第三方网站「{target.label}」({target.url.replace(/^https?:\/\//, '')})。
          </p>
          <p>
            本网站与该网站<b className="text-gray-800">没有任何合作关系</b>
            ，提供此入口仅为帮助学弟学妹们学习和成长，方便分享资源。
          </p>
          <p>
            {target.note ||
              '该网站内容由第三方提供，请注意自行甄别、合理使用，具体以该网站官方说明为准。'}
          </p>
          <p>
            此栏目「老学长的资源分享」旨在帮助学弟学妹们更好地学习、打破信息差。如果您有比较好的网站想要分享给学弟学妹、帮助学弟学妹打破信息差，可以联系QQ邮箱
            <a
              href="mailto:contact@example.invalid"
              className="text-school-red hover:underline mx-1"
            >
              contact@example.invalid
            </a>
            。
          </p>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-school-red text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            继续前往
          </button>
        </div>
      </div>
    </div>
  )
}

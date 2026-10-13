import { useState } from 'react'
import { MapPin, ZoomIn } from 'lucide-react'

export default function CampusMap() {
  const [showFullImage, setShowFullImage] = useState(false)

  return (
    <div className="bg-white border border-gray-100 p-6 md:p-9">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-school-red" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">校园地图</h3>
        </div>
        <button
          onClick={() => setShowFullImage(true)}
          className="flex items-center space-x-1 text-sm text-school-red hover:text-red-700 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
          <span>查看大图</span>
        </button>
      </div>
      <div 
        className="relative min-h-[420px] md:min-h-[680px] bg-gray-50 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => setShowFullImage(true)}
      >
        <img
          src="/images/placeholder.svg"
          alt="沈丘一高校园地图"
          className="w-auto h-auto max-w-[90%] max-h-[620px] object-contain"
        />
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
          <ZoomIn className="w-4 h-4 text-school-red" />
          <span className="text-sm font-medium text-gray-800">点击查看大图</span>
        </div>
      </div>
      {showFullImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            onClick={() => setShowFullImage(false)}
          >
            ×
          </button>
          <img
            src="/images/placeholder.svg"
            alt="沈丘一高校园地图"
            className="max-w-[90vw] max-h-[90vh] shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}

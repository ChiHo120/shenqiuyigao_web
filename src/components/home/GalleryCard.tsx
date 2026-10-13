import { Image, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Database } from '../../../types/database'

interface GalleryCardProps {
  gallery: Database['public']['Tables']['gallery']['Row'][]
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  return (
    <div className="bg-white border border-gray-100 p-6 md:p-9">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center space-x-2">
          <Image className="w-5 h-5 text-school-red" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">校园风光</h3>
        </div>
        <Link to="/campus" className="text-sm text-school-red hover:text-red-700 flex items-center space-x-1">
          <span>更多</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {gallery.slice(0, 4).map((item) => (
          <Link key={item.id} to="/campus" className="block relative aspect-[4/3] overflow-hidden group">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
import React from 'react'
import { Play, Clock, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import Image from './Image'

export interface VideoData {
  id: number
  title: string
  description: string
  cover_url: string | null
  video_url: string | null
  duration: string
  published_at: string
}

interface VideoCardProps {
  video: VideoData
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const hasVideo = !!video.video_url

  return (
    <Link
      to={`/videos/${video.id}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.cover_url}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          aspectRatio="16/9"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              hasVideo 
                ? 'bg-school-red' 
                : 'bg-gray-500 cursor-not-allowed'
            }`}>
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-sm rounded">
          {video.duration}
        </div>
        {!hasVideo && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gray-500/80 text-white text-xs rounded">
            待上传
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-school-red transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(video.published_at).toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            播放
          </span>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
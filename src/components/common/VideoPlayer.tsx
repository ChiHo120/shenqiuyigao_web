import React, { useState } from 'react'
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string | null
  coverUrl: string
  title: string
  duration?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  coverUrl,
  title,
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  if (!videoUrl) {
    return (
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="w-20 h-20 rounded-full bg-school-red/80 flex items-center justify-center mb-4">
            <Play className="w-8 h-8 ml-1" />
          </div>
          <p className="text-xl font-semibold">视频素材待上传</p>
          <p className="text-gray-300 mt-2">该视频尚未上传，请稍后再试</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-gray-900 overflow-hidden">
      <video
        src={videoUrl}
        poster={coverUrl}
        className="w-full h-full"
        controls
        autoPlay={isPlaying}
        muted={isMuted}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMuted(!isMuted)
          }}
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      {duration && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
          {duration}
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
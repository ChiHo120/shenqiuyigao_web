import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Share2, Eye } from 'lucide-react'
import VideoPlayer from '../components/common/VideoPlayer'
import VideoCard from '../components/common/VideoCard'
import { mockVideos } from '../data/mockData'
import { VideoData } from '../components/common/VideoCard'

export const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [video, setVideo] = useState<VideoData | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const foundVideo = mockVideos.find(v => v.id === parseInt(id || '0'))
      setVideo(foundVideo || null)
      setRelatedVideos(mockVideos.filter(v => v.id !== parseInt(id || '0')).slice(0, 3))
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">视频不存在</p>
            <Link to="/videos" className="text-school-red hover:underline mt-4 inline-block">
              返回视频列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/videos" className="flex items-center gap-2 text-gray-600 hover:text-school-red transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回视频列表</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <VideoPlayer
            videoUrl={video.video_url}
            coverUrl={video.cover_url || '/images/placeholder.svg'}
            title={video.title}
            duration={video.duration}
          />

          <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{video.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(video.published_at).toLocaleDateString('zh-CN')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                时长 {video.duration}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                播放
              </span>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">{video.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>分享</span>
              </button>
            </div>
          </div>

          {relatedVideos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">相关视频</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedVideos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
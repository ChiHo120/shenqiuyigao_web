import React, { useState, useEffect } from 'react'
import { Video, Filter } from 'lucide-react'
import VideoCard from '../components/common/VideoCard'
import { mockVideos } from '../data/mockData'
import { VideoData } from '../components/common/VideoCard'

export const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setVideos(mockVideos)
      setLoading(false)
    }, 500)
  }, [])

  const filteredVideos = category === 'all' 
    ? videos 
    : videos.filter(v => v.title.toLowerCase().includes(category.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-school-red text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-10 h-10" />
            <h1 className="text-4xl font-bold">校园视频</h1>
          </div>
          <p className="text-red-100 text-lg">观看校园精彩瞬间，感受校园生活魅力</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">筛选：</span>
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === 'all'
                  ? 'bg-school-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setCategory('宣传片')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === '宣传片'
                  ? 'bg-school-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              宣传片
            </button>
            <button
              onClick={() => setCategory('活动')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === '活动'
                  ? 'bg-school-red text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              活动视频
            </button>
          </div>
          <span className="text-gray-500">共 {filteredVideos.length} 个视频</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">暂无视频内容</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Videos
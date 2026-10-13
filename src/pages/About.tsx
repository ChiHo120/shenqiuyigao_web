import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { getGallery } from '../api/supabase'
import type { Database } from '../../types/database'

export default function About() {
  const [gallery, setGallery] = useState<Database['public']['Tables']['gallery']['Row'][]>([])

  useEffect(() => {
    const fetchData = async () => {
      const galleryRes = await getGallery()
      setGallery(galleryRes.data || [])
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">学校概况</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          沈丘县第一高级中学创建于1954年，是河南省示范性普通高中、周口市重点高中。
          学校秉承"办人民满意的学校，创适合学生的教育"的办学理念，为国家培养了大批优秀人才。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">学校简介</h2>
          <div className="space-y-4 text-gray-600 leading-7">
            <p>
              沈丘县第一高级中学始建于1954年，是河南省示范性普通高中、周口市重点高中。
            </p>
            <p>
              学校秉承“办人民满意的学校，创适合学生的教育”的办学理念，坚持立德树人，促进学生全面发展。
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">联系方式</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-school-red flex-shrink-0 mt-1" />
              <div>
                <div className="font-medium text-gray-800">学校地址</div>
                <div className="text-gray-600">河南省周口市沈丘县001乡道与东环路交汇处东300米</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-school-red flex-shrink-0 mt-1" />
              <div>
                <div className="font-medium text-gray-800">联系电话</div>
                <div className="text-gray-600">请在自己的部署中配置</div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-school-red flex-shrink-0 mt-1" />
              <div>
                <div className="font-medium text-gray-800">网站电子邮箱</div>
                <div className="text-gray-600">contact@example.invalid</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="gallery" className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">校园风光</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.map((item) => (
            <div key={item.id} className="relative aspect-video overflow-hidden rounded-lg group">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
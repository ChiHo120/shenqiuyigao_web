import { useEffect, useState } from 'react'
import { GraduationCap, BookOpen, Award, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getTeachers } from '../api/supabase'
import type { Database } from '../../types/database'

export default function Teachers() {
  const [teachers, setTeachers] = useState<Database['public']['Tables']['teachers']['Row'][]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTeachers()
      setTeachers(res.data || [])
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">师资力量</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          沈丘一高拥有一支高素质的教师队伍，本页使用虚构教师资料演示列表和详情功能，
          拥有一批省市级骨干教师和学科带头人。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Link
            key={teacher.id}
            to={`/teachers/${teacher.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 block"
          >
            <div className="h-48 bg-gradient-to-br from-school-red/20 to-red-100 flex items-center justify-center">
              {teacher.avatar_url ? (
                <img
                  src={teacher.avatar_url}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                  <GraduationCap className="w-12 h-12 text-school-red" />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                {teacher.title === '特级教师' && (
                  <span className="px-2 py-1 bg-school-red text-white text-xs rounded-full">
                    {teacher.title}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{teacher.subject}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{teacher.education}</span>
              </div>
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-school-gold fill-school-gold" />
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{teacher.achievements}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">教师荣誉</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-school-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-school-red" />
            </div>
            <div className="text-3xl font-bold text-school-red mb-2">12</div>
            <div className="text-gray-600">特级教师</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">86</div>
            <div className="text-gray-600">高级教师</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">45</div>
            <div className="text-gray-600">省级骨干教师</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">120</div>
            <div className="text-gray-600">市级骨干教师</div>
          </div>
        </div>
      </div>
    </div>
  )
}

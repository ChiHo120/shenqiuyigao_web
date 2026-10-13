import { useEffect, useState } from 'react'
import { Trophy, Medal, Star, Calendar } from 'lucide-react'
import { getAchievements } from '../api/supabase'
import type { Database } from '../../types/database'

export default function Achievements() {
  const [achievements, setAchievements] = useState<Database['public']['Tables']['achievements']['Row'][]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAchievements()
      setAchievements(res.data || [])
    }
    fetchData()
  }, [])

  const groupedByYear = achievements.reduce((acc, item) => {
    const year = item.year?.toString() || '未知'
    if (!acc[year]) acc[year] = []
    acc[year].push(item)
    return acc
  }, {} as Record<string, Database['public']['Tables']['achievements']['Row'][]>)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'honor':
        return Medal
      case 'competition':
        return Trophy
      case 'sports':
        return Star
      default:
        return Trophy
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'honor':
        return '荣誉'
      case 'competition':
        return '竞赛'
      case 'sports':
        return '体育'
      default:
        return '其他'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">教学成果</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          沈丘一高在教育教学方面取得了丰硕成果，多次获得省市级荣誉，学生在各类竞赛中屡获佳绩。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-school-red to-red-700 rounded-xl shadow-lg p-8 text-center text-white">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">—</div>
          <div className="text-white/80">一本上线人数</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-center text-white">
          <Medal className="w-16 h-16 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">—</div>
          <div className="text-white/80">本科上线率</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg p-8 text-center text-white">
          <Star className="w-16 h-16 mx-auto mb-4" />
          <div className="text-4xl font-bold mb-2">—</div>
          <div className="text-white/80">竞赛获奖</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">历年成果</h2>
        <div className="space-y-8">
          {Object.entries(groupedByYear)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([year, items]) => (
              <div key={year} className="border-b border-gray-200 pb-8 last:border-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-6 h-6 text-school-red" />
                  <h3 className="text-xl font-bold text-gray-800">{year}年</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => {
                    const Icon = getTypeIcon(item.type || '')
                    return (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-school-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-school-red" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{item.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="px-2 py-0.5 bg-gray-200 rounded text-xs text-gray-600">
                              {getTypeLabel(item.type || '')}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
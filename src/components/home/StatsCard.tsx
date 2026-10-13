import { Users, BookOpen, GraduationCap, Award } from 'lucide-react'
import type { Database } from '../../../types/database'

interface StatsCardProps {
  stats: Database['public']['Tables']['school_stats']['Row'][]
}

export default function StatsCard({ stats }: StatsCardProps) {
  const statMap = new Map(stats.map(s => [s.stat_name, s]))

  const statItems = [
    { key: 'students', label: '在校学生', icon: Users, suffix: '名' },
    { key: 'teachers', label: '教职工', icon: GraduationCap, suffix: '人' },
    { key: 'classes', label: '教学班', icon: BookOpen, suffix: '个' },
    { key: 'founded_year', label: '建校年份', icon: Award, suffix: '' },
  ]

  return (
    <div className="bg-gradient-to-r from-school-red to-red-700 rounded-xl shadow-lg p-8">
      <h3 className="text-center text-white text-xl font-bold mb-8">学校概况</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statItems.map((item) => {
          const stat = statMap.get(item.key)
          const Icon = item.icon
          return (
            <div key={item.key} className="text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat?.stat_value}{item.suffix}
              </div>
              <div className="text-white/80 text-sm">{item.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
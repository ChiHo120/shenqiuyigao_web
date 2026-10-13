import { Trophy, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Database } from '../../../types/database'

interface AchievementCardProps {
  achievements: Database['public']['Tables']['achievements']['Row'][]
}

export default function AchievementCard({ achievements }: AchievementCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-school-gold" />
          <h3 className="text-lg font-bold text-gray-800">教学成果</h3>
        </div>
        <Link to="/achievements" className="text-sm text-school-red hover:text-red-700 flex items-center space-x-1">
          <span>更多</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.slice(0, 4).map((item) => (
          <div key={item.id} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-2xl font-bold text-school-red mb-1">{item.year}</div>
            <div className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
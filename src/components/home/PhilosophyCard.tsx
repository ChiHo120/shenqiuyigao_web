import { ArrowRight, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PhilosophyCard() {
  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-school-red/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Target className="w-5 h-5 text-school-red" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">办学理念</h3>
          <p className="text-gray-600">办人民满意的学校，创适合学生的教育</p>
        </div>
      </div>
      <Link to="/philosophy" className="inline-flex items-center gap-1 text-sm text-school-red hover:text-red-700 self-end md:self-auto">
        了解更多
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
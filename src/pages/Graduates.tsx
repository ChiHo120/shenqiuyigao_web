import { useState, useEffect } from 'react'
import { Plus, Camera, Calendar, Mail } from 'lucide-react'
import AddGraduateModal from '../components/common/AddGraduateModal'

interface GraduatePhoto {
  id: number
  year: number
  className: string
  image_url: string
  count?: number
}

const mockGraduates: GraduatePhoto[] = [{ id: 1, year: 2024, className: '示例班级', image_url: '/images/placeholder.svg' }]

export default function Graduates() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [graduates, setGraduates] = useState(mockGraduates)

  useEffect(() => {
    const storedGraduates = localStorage.getItem('sqyg_demo_customGraduates')
    if (storedGraduates) {
      const customGraduates = JSON.parse(storedGraduates)
      setGraduates([...customGraduates, ...mockGraduates])
    }
  }, [])

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1999 }, (_, index) => currentYear - index)

  const filteredGraduates = [...(
    selectedYear
      ? graduates.filter(graduate => graduate.year === selectedYear)
      : graduates
  )].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    const classNumA = Number(a.className.match(/\d+/)?.[0] ?? Number.MAX_SAFE_INTEGER)
    const classNumB = Number(b.className.match(/\d+/)?.[0] ?? Number.MAX_SAFE_INTEGER)
    return classNumA - classNumB
  })

  const handleAddPhoto = () => {
    setIsModalOpen(true)
  }

  const handleAddGraduateSubmit = (data: { image_url: string; year: number; className: string }) => {
    const newGraduate = {
      id: Date.now(),
      year: data.year,
      className: data.className,
      image_url: data.image_url,
    }
    
    try {
      const storedGraduates = localStorage.getItem('sqyg_demo_customGraduates')
      const customGraduates = storedGraduates ? JSON.parse(storedGraduates) : []
      customGraduates.unshift(newGraduate)
      localStorage.setItem('sqyg_demo_customGraduates', JSON.stringify(customGraduates))
      setGraduates([newGraduate, ...graduates])
    } catch (error) {
      alert('存储空间不足，请使用较小图片或清理浏览器数据')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">历年毕业生照片</h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-7">
          本栏目用于保存沈丘一高历届毕业生集体记忆。若您愿意提供毕业照，请注明毕业年份和班级，并联系
          <a href="mailto:contact@example.invalid" className="text-school-red hover:underline mx-1">contact@example.invalid</a>。
          欢迎交流，沈丘一高QQ群
          <span className="text-school-red font-medium mx-1">请在自己的部署中配置</span>。
        </p>
        <button
          onClick={handleAddPhoto}
          className="mt-5 inline-flex items-center px-5 py-2.5 bg-school-red text-white rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          添加毕业照
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedYear(null)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedYear === null
              ? 'bg-school-red text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          全部年份
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedYear === year
                ? 'bg-school-red text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {year}届
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGraduates.map((graduate) => (
          <div
            key={graduate.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={graduate.image_url}
                alt={`${graduate.year}届${graduate.className}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 bg-school-red text-white px-3 py-1 rounded-full text-sm font-medium">
                {graduate.year}届
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">{graduate.className}</h3>
                <span className="text-sm text-gray-500">{graduate.year}年毕业</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Camera className="w-4 h-4 mr-1" />
                班级毕业照
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGraduates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">该年份暂无收录的毕业生照片</p>
          <p className="text-sm mt-2 flex items-center justify-center gap-1">
            <Mail className="w-4 h-4" />
            提供照片时请注明毕业年份和班级，并联系 contact@example.invalid
          </p>
        </div>
      )}

      <AddGraduateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGraduateSubmit}
      />
    </div>
  )
}

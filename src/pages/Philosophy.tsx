import { Target, Heart, Lightbulb, Sparkles, BookOpen, GraduationCap } from 'lucide-react'

export default function Philosophy() {
  const philosophies = [
    {
      icon: Target,
      title: '办学理念',
      content: '办人民满意的学校，创适合学生的教育',
      description: '以人民满意为出发点，以学生发展为落脚点，努力创造适合每个学生成长的教育环境。',
    },
    {
      icon: Heart,
      title: '育人理念',
      content: '立德树人 全面发展',
      description: '坚持德育为先，培养品德高尚、学业优良、身心健康、全面发展的新时代人才。',
    },
    {
      icon: Lightbulb,
      title: '校训',
      content: '规范 创新 自强 卓越',
      description: '规范行为，创新思维，自强不息，追求卓越。',
    },
    {
      icon: Sparkles,
      title: '校风',
      content: '尚德 崇文 勤研 躬行',
      description: '崇尚道德，重视文化，勤奋钻研，身体力行。',
    },
    {
      icon: BookOpen,
      title: '教风',
      content: '厚生乐教 固本求真',
      description: '关爱学生，乐于教学，夯实基础，追求真理。',
    },
    {
      icon: GraduationCap,
      title: '学风',
      content: '做学习的主人',
      description: '培养自主学习能力，激发学习兴趣，成为学习的主人。',
    },
  ]

  const strategies = [
    {
      title: '高一·我要奔跑',
      description: '适应高中生活，培养学习习惯，夯实基础知识，激发学习兴趣。',
    },
    {
      title: '高二·我要领跑',
      description: '深化知识体系，拓展思维能力，培养综合素质，明确发展方向。',
    },
    {
      title: '高三·我要飞翔',
      description: '冲刺高考目标，提升应试能力，培养心理素质，实现人生梦想。',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">办学理念</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          沈丘一高秉承先进的教育理念，以培养全面发展的人才为目标，不断探索创新，努力办人民满意的教育。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {philosophies.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-school-red/10 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-school-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <div className="text-school-red font-medium mb-3">{item.content}</div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-r from-school-red to-red-700 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-8">三年培养战略</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategies.map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-white mb-3">{index + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">发展战略</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">制度治校</h3>
              <p className="text-gray-600 text-sm">建立健全各项规章制度，依法治校，规范管理。</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">质量立校</h3>
              <p className="text-gray-600 text-sm">以教学质量为生命线，不断提高教育教学水平。</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">人才强校</h3>
              <p className="text-gray-600 text-sm">加强教师队伍建设，引进和培养优秀人才。</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">文化润校</h3>
              <p className="text-gray-600 text-sm">营造浓厚的校园文化氛围，培养学生人文素养。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
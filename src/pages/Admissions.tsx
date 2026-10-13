import { FileText, Calendar, Users, Phone, Mail, ArrowRight } from 'lucide-react'

export default function Admissions() {
  const admissionYears = [{ year: 2024, score: '—', total: '—', note: '演示占位，不提供实际招生数据' }]

  const admissionInfo = [
    {
      icon: Calendar,
      title: '报名时间',
      content: '报名时间未配置',
    },
    {
      icon: Users,
      title: '招生计划',
      content: '招生计划未配置',
    },
    {
      icon: FileText,
      title: '报名方式',
      content: '网上报名或现场报名',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">招生信息</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          沈丘一高每年面向全县招收优秀初中毕业生，欢迎有志于追求卓越的学子报考。
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">历年录取分数线</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">年份</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">录取分数线</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">招生人数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admissionYears.map((item) => (
                <tr key={item.year} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.year}年</td>
                  <td className="px-6 py-4 text-sm text-school-red font-bold">{item.score}分{item.note && <span className="text-gray-500 font-normal ml-2">({item.note})</span>}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.total}人</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {admissionInfo.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-14 h-14 bg-school-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-school-red" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">招生政策</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-school-red rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">录取原则</h3>
              <p className="text-gray-600 text-sm">按照考生中考成绩从高到低择优录取，同等条件下优先录取综合素质评价优秀的学生。</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-school-red rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">优惠政策</h3>
              <p className="text-gray-600 text-sm">对品学兼优的学生给予奖学金支持，对家庭困难的学生提供助学金帮助。</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-school-red rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">咨询方式</h3>
              <p className="text-gray-600 text-sm">招生期间学校设立专门咨询热线，欢迎家长和学生来电咨询。</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="font-bold text-gray-800 mb-4">联系方式</h3>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="px-6 py-3 bg-school-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>招生热线</span>
            </a>
            <a href="mailto:contact@example.invalid" className="px-6 py-3 border-2 border-school-red text-school-red font-medium rounded-lg hover:bg-school-red hover:text-white transition-colors flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>发送邮件</span>
            </a>
            <button onClick={() => alert('招生简章下载功能待学校提供资料后上线')} className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>下载招生简章</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">沈丘县第一高级中学</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              沈丘一高创建于1954年，是河南省示范性普通高中、周口市重点高中。
              学校秉承"办人民满意的学校，创适合学生的教育"的办学理念，
              坚持立德树人，全面发展，为国家培养了大批优秀人才。
            </p>
            <div className="flex space-x-4">
              <span className="text-xs px-3 py-1 bg-school-red rounded-full">河南省示范性高中</span>
              <span className="text-xs px-3 py-1 bg-blue-600 rounded-full">周口市重点高中</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-school-red" />
                <span>河南省周口市沈丘县001乡道与东环路交汇处东300米</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-school-red" />
                <a href="/contact" className="hover:text-white transition-colors">请在自己的部署中配置</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-school-red" />
                <a href="mailto:contact@example.invalid" className="hover:text-white transition-colors">网站电子邮箱：contact@example.invalid</a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-school-red" />
                <span>微信公众号：未配置</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-school-red transition-colors">学校概况</Link></li>
              <li><Link to="/philosophy" className="hover:text-school-red transition-colors">办学理念</Link></li>
              <li><Link to="/admissions" className="hover:text-school-red transition-colors">招生信息</Link></li>
              <li><Link to="/news" className="hover:text-school-red transition-colors">校园动态</Link></li>
              <li><Link to="/announcements" className="hover:text-school-red transition-colors">通知公告</Link></li>
              <li><Link to="/campus" className="hover:text-school-red transition-colors">校园照片</Link></li>
              <li><Link to="/#campus-map" className="hover:text-school-red transition-colors">校园地图</Link></li>
              <li><Link to="/contact" className="hover:text-school-red transition-colors">联系我们</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 沈丘一高网站开源项目 · 校友维护</p>
        </div>
      </div>
    </footer>
  )
}
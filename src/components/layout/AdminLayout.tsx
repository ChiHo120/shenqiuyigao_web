import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Bell, Users, Video, Images, GraduationCap, BookOpen, Settings, MessageSquare, Download, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const adminMenu = [
  { label: '仪表盘', path: '/admin', icon: LayoutDashboard },
  { label: '新闻管理', path: '/admin/news', icon: FileText },
  { label: '通知管理', path: '/admin/notices', icon: Bell },
  { label: '教师管理', path: '/admin/teachers', icon: Users },
  { label: '视频管理', path: '/admin/videos', icon: Video },
  { label: '相册管理', path: '/admin/albums', icon: Images },
  { label: '毕业照管理', path: '/admin/graduates', icon: GraduationCap },
  { label: '招生信息', path: '/admin/admissions', icon: BookOpen },
  { label: '网站配置', path: '/admin/settings', icon: Settings },
  { label: '私密留言', path: '/admin/messages', icon: MessageSquare },
  { label: '数据导出', path: '/admin/export', icon: Download },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-school-red rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">管理后台</h1>
              <p className="text-xs text-gray-500">沈丘一高</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {adminMenu.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-school-red text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      <div className={`md:ml-64 transition-all duration-300 ${isMenuOpen ? 'fixed inset-0 z-40 bg-black/50' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

      <div className={`md:ml-64 transition-all duration-300`}>
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {adminMenu.find(item => isActive(item.path))?.label || '管理后台'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">管理员</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

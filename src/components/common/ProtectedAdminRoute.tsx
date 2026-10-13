import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading, user } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-school-red animate-pulse">加载中...</div>
      </div>
    )
  }

  if (!user) return <Navigate to={'/admin/login?redirect=' + encodeURIComponent(location.pathname)} replace />
  if (!isAdmin) return <Navigate to='/admin/unauthorized' replace />

  return <>{children}</>
}

export function UnauthorizedPage() {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">无权限访问</h1>
      <p className="text-gray-600 mb-6">您的账号没有管理员权限</p>
      <button
        onClick={logout}
        className="px-6 py-2 bg-school-red text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        退出登录
      </button>
    </div>
  )
}

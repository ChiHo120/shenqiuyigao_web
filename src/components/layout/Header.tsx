import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, LogOut, Shield } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navigation, isNavActive } from '../../config/navigation'
import { useAuth } from '../../hooks/useAuth'
import ExternalSiteModal, { type ExternalTarget } from '../common/ExternalSiteModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [externalTarget, setExternalTarget] = useState<ExternalTarget | null>(null)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin, logout } = useAuth()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen) return
      const isInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(e.target as Node)
      )
      if (!isInsideAnyDropdown) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const toggleDropdown = (groupLabel: string) => {
    setOpenDropdown(openDropdown === groupLabel ? null : groupLabel)
  }

  return (
    <header className={`${isHome ? 'absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/30 to-transparent text-white' : 'sticky top-0 bg-white shadow-md'} z-50`}>
      <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className={`flex items-center justify-between ${isHome ? 'h-24 lg:h-28 border-b border-white/25' : 'h-16'}`}>
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <img
              src="/images/placeholder.svg"
              alt="沈丘一高开源演示标识"
              className={`${isHome ? 'w-12 h-12 lg:w-14 lg:h-14 drop-shadow-md' : 'w-11 h-11'} object-contain`}
            />
            <div>
              <div className={`${isHome ? 'text-white text-2xl lg:text-3xl drop-shadow-md' : 'text-gray-800 text-xl'} font-bold tracking-wide`}>沈丘一高</div>
              <p className={`${isHome ? 'text-white/80 text-sm' : 'text-gray-500 text-xs'}`}>沈丘县第一高级中学</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((group) => {
              if (!group.children) {
                return (
                  <Link
                    key={group.label}
                    to={group.path || '/'}
                    aria-current={isNavActive(group.path || '', location.pathname) ? 'page' : undefined}
                    className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isNavActive(group.path || '', location.pathname)
                        ? (isHome ? 'bg-white/20 text-white' : 'bg-school-red text-white')
                        : (isHome ? 'text-white/95 hover:bg-white/15 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-school-red')
                    }`}
                  >
                    {group.label}
                  </Link>
                )
              }

              return (
                <div
                  key={group.label}
                  className="relative"
                  ref={(el) => { dropdownRefs.current[group.label] = el }}
                  onMouseEnter={() => setOpenDropdown(group.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openDropdown === group.label}
                    aria-controls={`dropdown-${group.label}`}
                    onClick={() => toggleDropdown(group.label)}
                    className={`flex items-center space-x-1 px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      group.children.some(child => isNavActive(child.path, location.pathname))
                        ? (isHome ? 'bg-white/20 text-white' : 'bg-school-red text-white')
                        : (isHome ? 'text-white/95 hover:bg-white/15 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-school-red')
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {openDropdown === group.label && (
                    <div
                      id={`dropdown-${group.label}`}
                      role="menu"
                      className="absolute top-full left-0 mt-0 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[160px]"
                    >
                      {group.children!.map((child) =>
                        child.external ? (
                          <button
                            key={child.path}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setOpenDropdown(null)
                              setExternalTarget({ label: child.label, url: child.external!, note: child.externalNote })
                            }}
                            className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-school-red"
                          >
                            {child.label}
                          </button>
                        ) : (
                          <Link
                            key={child.path}
                            to={child.path}
                            role="menuitem"
                            aria-current={isNavActive(child.path, location.pathname) ? 'page' : undefined}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              isNavActive(child.path, location.pathname)
                                ? 'bg-school-red text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-school-red'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {isAdmin && (
              <div className="ml-4 flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span>管理后台</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>退出</span>
                </button>
              </div>
            )}
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={isMenuOpen}
            className={`md:hidden p-2 rounded-md transition-colors ${isHome ? 'bg-school-red text-white hover:bg-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden py-4 px-2 rounded-b-lg shadow-xl ${isHome ? 'bg-white border-t border-gray-100' : 'border-t'}`}>
            {navigation.map((group) => {
              if (!group.children) {
                return (
                  <Link
                    key={group.label}
                    to={group.path || '/'}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isNavActive(group.path || '', location.pathname)
                        ? 'bg-school-red text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {group.label}
                  </Link>
                )
              }

              return (
                <div key={group.label}>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === group.label ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === group.label && (
                    <div className="ml-4 py-2 space-y-1">
                      {group.children!.map((child) =>
                        child.external ? (
                          <button
                            key={child.path}
                            type="button"
                            onClick={() => {
                              setOpenDropdown(null)
                              setIsMenuOpen(false)
                              setExternalTarget({ label: child.label, url: child.external!, note: child.externalNote })
                            }}
                            className="block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100"
                          >
                            {child.label}
                          </button>
                        ) : (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                              isNavActive(child.path, location.pathname)
                                ? 'bg-school-red text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {isAdmin && (
              <div className="mt-4 pt-4 border-t space-y-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Shield className="w-4 h-4" />
                  <span>管理后台</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>退出登录</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ExternalSiteModal
        target={externalTarget}
        onClose={() => setExternalTarget(null)}
      />
    </header>
  )
}

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="bg-amber-50 text-amber-900 text-center px-4 py-2 text-sm">沈丘一高开源演示版 · 人物、新闻、统计及素材均为示例 · 编辑仅保存在当前浏览器</div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
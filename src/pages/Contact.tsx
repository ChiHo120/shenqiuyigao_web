import { MapPin, Phone, Mail, Clock, Send, Trash2, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'
import { messageService, type Message } from '../data/mockData'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // 加载留言
  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    const msgs = await messageService.getMessages()
    setMessages(msgs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await messageService.addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        content: formData.message,
      })
      alert('演示留言已保存在本机浏览器，没有发送给学校。')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      loadMessages()
    } catch (error) {
      alert('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await messageService.deleteMessage(deleteId)
      alert('删除成功')
      setDeleteId(null)
      loadMessages()
    } catch (error: any) {
      alert(error.message || '删除失败')
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: '学校地址',
      content: '河南省周口市沈丘县001乡道与东环路交汇处东300米',
    },
    {
      icon: Phone,
      title: '联系电话',
      content: '请在自己的部署中配置',
      link: '/contact',
    },
    {
      icon: Mail,
      title: '网站电子邮箱',
      content: 'contact@example.invalid',
      link: 'mailto:contact@example.invalid',
    },
    {
      icon: Clock,
      title: '办公时间',
      content: '周一至周五 8:00-17:30',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">联系我们</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          如果您有任何问题或建议，欢迎随时联系我们。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">联系方式</h2>
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                const contentEl = item.link ? (
                  <a href={item.link} className="text-gray-600 hover:text-school-red transition-colors">
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.content}</p>
                )
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-school-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-school-red" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                      {contentEl}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">本机演示留言</h2><p className="mb-4 text-amber-800">仅保存在当前浏览器，请勿输入真实姓名、电话或邮箱；不会发送给学校。</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主题</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-red focus:border-transparent resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-school-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{loading ? '提交中...' : '发送留言'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-6 h-6 text-school-red" />
          <h2 className="text-2xl font-bold text-gray-800">留言列表</h2>
          <span className="text-gray-500 text-sm">({messages.length}条留言)</span>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            暂无留言，欢迎留下您的宝贵意见！
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800">{msg.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(msg.created_at).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {msg.email && <span className="mr-4">邮箱：{msg.email}</span>}
                      {msg.phone && <span>电话：{msg.phone}</span>}
                    </div>
                    {msg.subject && (
                      <div className="text-sm font-medium text-school-red mb-2">
                        主题：{msg.subject}
                      </div>
                    )}
                    <p className="text-gray-600">{msg.content}</p>
                  </div>
                  <button
                    onClick={() => setDeleteId(msg.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="删除留言"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 删除确认弹窗 */}
                {deleteId === msg.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">确认删除此浏览器中的演示留言？</p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        确认删除
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(null)
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

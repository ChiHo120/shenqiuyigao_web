// 所有记录均为虚构演示数据，不代表学校实际信息。
export const demoImage = '/images/placeholder.svg'
const timestamp = '2024-01-01T00:00:00Z'

export const mockNotices = [
  { id: 1, title: '沈丘一高示例通知', content: '这是开源演示数据，请在自己的部署中替换为正式通知。', publish_date: timestamp, priority: 1, is_pinned: true, views: 0, created_at: timestamp, updated_at: timestamp },
  { id: 2, title: '沈丘一高校园安全提醒（示例）', content: '这是开源演示数据，请勿直接用于生产环境。', publish_date: timestamp, priority: 2, is_pinned: false, views: 0, created_at: timestamp, updated_at: timestamp },
]
export const mockNews = [
  { id: 1, title: '沈丘一高校园活动记录（示例）', content: '这里是用于本地开发的占位内容。', category: '校园活动', publish_date: timestamp, author: '编辑部', image_url: demoImage, is_published: true, external_url: null, created_at: timestamp, updated_at: timestamp, views: 0 },
  { id: 2, title: '沈丘一高教学交流活动（示例）', content: '这里是用于本地开发的占位内容。', category: '教育教学', publish_date: timestamp, author: '编辑部', image_url: demoImage, is_published: true, external_url: null, created_at: timestamp, updated_at: timestamp, views: 0 },
]
export const mockAchievements = [
  { id: 1, title: '沈丘一高示例教学成果', description: '请替换为经过授权的公开信息。', type: 'honor', level: 'school', year: 2024, image_url: demoImage, is_published: true, created_at: timestamp, updated_at: timestamp },
  { id: 2, title: '沈丘一高示例竞赛成果', description: '这是开源演示数据。', type: 'competition', level: 'school', year: 2023, image_url: demoImage, is_published: true, created_at: timestamp, updated_at: timestamp },
]
export const mockTeachers = [
  { id: 1, name: '示例教师甲', title: '教师', subject: '语文', education: '本科', department: '教学部门', achievements: '演示数据，请替换为经授权的信息。', avatar_url: demoImage, is_published: true, created_at: timestamp, updated_at: timestamp },
  { id: 2, name: '示例教师乙', title: '教师', subject: '数学', education: '本科', department: '教学部门', achievements: '演示数据，请替换为经授权的信息。', avatar_url: demoImage, is_published: true, created_at: timestamp, updated_at: timestamp },
]
export const mockGallery = [
  { id: 1, title: '沈丘一高示例校园图片', description: '请替换为拥有发布授权的图片。', image_url: demoImage, category: 'campus', upload_date: timestamp, is_published: true, created_at: timestamp, updated_at: timestamp },
  { id: 2, title: '沈丘一高示例活动图片', description: '这是开源演示素材。', image_url: demoImage, category: 'activity', upload_date: timestamp, is_published: true, created_at: timestamp, updated_at: timestamp },
]
export const mockSchoolStats = [
  { id: 1, stat_name: 'campus_area', stat_value: '—', description: '校园面积', created_at: timestamp, updated_at: timestamp },
  { id: 2, stat_name: 'students', stat_value: '—', description: '在校学生', created_at: timestamp, updated_at: timestamp },
  { id: 3, stat_name: 'teachers', stat_value: '—', description: '教职工', created_at: timestamp, updated_at: timestamp },
  { id: 5, stat_name: 'classes', stat_value: '—', description: '教学班', created_at: timestamp, updated_at: timestamp },
  { id: 4, stat_name: 'founded_year', stat_value: '—', description: '建校年份', created_at: timestamp, updated_at: timestamp },
]
export const mockContactInfo = { phone: '请在自己的部署中配置', email: 'contact@example.invalid', address: '请在自己的部署中配置', zipCode: '' }
export interface Message { id: string; name: string; email: string; phone: string; subject: string; content: string; created_at: string; is_deleted: boolean }
const getStoredMessages = (): Message[] => { try { const stored = localStorage.getItem('demo_messages'); return stored ? JSON.parse(stored) as Message[] : [] } catch { return [] } }
const saveMessages = (messages: Message[]) => localStorage.setItem('demo_messages', JSON.stringify(messages))
export const messageService = {
  getMessages: async (): Promise<Message[]> => getStoredMessages().filter(message => !message.is_deleted),
  addMessage: async (message: Omit<Message, 'id' | 'created_at' | 'is_deleted'>): Promise<Message> => { const newMessage: Message = { ...message, id: crypto.randomUUID(), created_at: new Date().toISOString(), is_deleted: false }; saveMessages([...getStoredMessages(), newMessage]); return newMessage },
  deleteMessage: async (id: string, _password?: string): Promise<boolean> => { saveMessages(getStoredMessages().filter(message => message.id !== id)); return true },
  verifyAdmin: async (): Promise<boolean> => false,
}
export const mockVideos = [{ id: 1, title: '沈丘一高示例校园视频', description: '这是开源演示视频条目。', cover_url: demoImage, video_url: null, duration: '—', views: 0, published_at: timestamp, is_published: true, created_at: timestamp, updated_at: timestamp }]

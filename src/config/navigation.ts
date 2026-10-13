export interface NavItem {
  label: string
  path: string
  external?: string
  externalNote?: string
}

export interface NavGroup {
  label: string
  path?: string
  children?: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    label: '首页',
    path: '/',
  },
  {
    label: '学校概况',
    children: [
      { label: '学校简介', path: '/about' },
      { label: '办学理念', path: '/philosophy' },
    ],
  },
  {
    label: '新闻公告',
    children: [
      { label: '校园动态', path: '/news' },
      { label: '通知公告', path: '/announcements' },
    ],
  },
  {
    label: '师资教学',
    children: [
      { label: '师资力量', path: '/teachers' },
      { label: '教学成果', path: '/achievements' },
    ],
  },
  {
    label: '校园生活',
    children: [
      { label: '校园照片', path: '/campus' },
      { label: '校园视频', path: '/videos' },
      { label: '历年毕业生', path: '/graduates' },
    ],
  },
  {
    label: '招生服务',
    children: [
      { label: '招生信息', path: '/admissions' },
      { label: '联系我们', path: '/contact' },
    ],
  },
  {
    label: '老学长的资源分享',
    children: [
      {
        label: '大学分数查询',
        path: '/external/gaokao',
        external: 'https://www.gaokao.cn/',
        externalNote: '该网站无需会员即可查询到一些基本的大学信息（如院校介绍、录取分数等），请注意自行甄别，最终以各高校官方发布为准。',
      },
      { label: '编程学习教程', path: '/external/runoob', external: 'https://www.runoob.com/' },
      {
        label: '硬笔书法',
        path: '/external/hard-pen',
        external: 'https://www.bilibili.com/video/BV1HJ411B7gf/',
      },
      { label: '打字测速', path: '/external/monkeytype', external: 'https://seerlite.github.io/monkeytype/' },
      { label: 'PDF工具', path: '/external/ilovepdf', external: 'https://www.ilovepdf.com/zh-cn' },
      { label: '抠图', path: '/external/miaocut', external: 'https://miaocut.app/zh/' },
      { label: 'latex公式', path: '/external/latexlive', external: 'https://www.latexlive.com/' },
      { label: '各种网盘资源查找', path: '/external/hunhepan', external: 'https://hunhepan.com/search' },
    ],
  },
]

export const adminNavigation: NavItem[] = [
  { label: '仪表盘', path: '/admin' },
  { label: '新闻管理', path: '/admin/news' },
  { label: '通知管理', path: '/admin/notices' },
  { label: '教师管理', path: '/admin/teachers' },
  { label: '视频管理', path: '/admin/videos' },
  { label: '相册管理', path: '/admin/albums' },
  { label: '毕业照管理', path: '/admin/graduates' },
  { label: '招生信息', path: '/admin/admissions' },
  { label: '网站配置', path: '/admin/settings' },
  { label: '私密留言', path: '/admin/messages' },
  { label: '数据导出', path: '/admin/export' },
]

export const getActiveNavPath = (currentPath: string): string => {
  for (const group of navigation) {
    if (group.path && currentPath === group.path) {
      return group.path
    }
    if (group.children) {
      for (const child of group.children) {
        if (currentPath === child.path || currentPath.startsWith(child.path + '/')) {
          return child.path
        }
      }
    }
  }
  return ''
}

export const isNavActive = (navPath: string, currentPath: string): boolean => {
  if (!navPath) return false
  if (navPath === '/') {
    return currentPath === '/'
  }
  return currentPath === navPath || currentPath.startsWith(navPath + '/')
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedAdminRoute, UnauthorizedPage } from './components/common/ProtectedAdminRoute'

import Home from './pages/Home'
import About from './pages/About'
import Philosophy from './pages/Philosophy'
import Teachers from './pages/Teachers'
import Achievements from './pages/Achievements'
import Admissions from './pages/Admissions'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Contact from './pages/Contact'
import Videos from './pages/Videos'
import VideoDetail from './pages/VideoDetail'
import TeacherDetail from './pages/TeacherDetail'
import Announcements from './pages/Announcements'
import AnnouncementDetail from './pages/AnnouncementDetail'
import Graduates from './pages/Graduates'
import Campus from './pages/Campus'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminNews from './pages/admin/AdminNews'
import AdminNotices from './pages/admin/AdminNotices'
import AdminTeachers from './pages/admin/AdminTeachers'
import AdminVideos from './pages/admin/AdminVideos'
import AdminAlbums from './pages/admin/AdminAlbums'
import AdminGraduates from './pages/admin/AdminGraduates'
import AdminAdmissions from './pages/admin/AdminAdmissions'
import AdminSettings from './pages/admin/AdminSettings'
import AdminMessages from './pages/admin/AdminMessages'
import AdminExport from './pages/admin/AdminExport'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/philosophy" element={<Layout><Philosophy /></Layout>} />
          <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
          <Route path="/teachers/:id" element={<Layout><TeacherDetail /></Layout>} />
          <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
          <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
          <Route path="/news" element={<Layout><News /></Layout>} />
          <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/videos" element={<Layout><Videos /></Layout>} />
          <Route path="/videos/:id" element={<Layout><VideoDetail /></Layout>} />
          <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
          <Route path="/announcements/:id" element={<Layout><AnnouncementDetail /></Layout>} />
          <Route path="/graduates" element={<Layout><Graduates /></Layout>} />
          <Route path="/campus" element={<Layout><Campus /></Layout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
          
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/news" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminNews /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/notices" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminNotices /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/teachers" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminTeachers /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/videos" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminVideos /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/albums" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminAlbums /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/graduates" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminGraduates /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/admissions" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminAdmissions /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/settings" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminSettings /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/messages" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminMessages /></AdminLayout>
            </ProtectedAdminRoute>
          } />
          
          <Route path="/admin/export" element={
            <ProtectedAdminRoute>
              <AdminLayout><AdminExport /></AdminLayout>
            </ProtectedAdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

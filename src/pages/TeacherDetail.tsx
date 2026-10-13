import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Award, GraduationCap } from 'lucide-react'
import Image from '../components/common/Image'
import { getTeacherById, getTeachers } from '../services/teachers'

export const TeacherDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [teacher, setTeacher] = useState<any>(null)
  const [otherTeachers, setOtherTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getTeacherById(parseInt(id || '0')),
      getTeachers(6)
    ]).then(([teacherResult, othersResult]) => {
      setTeacher(teacherResult.data)
      setOtherTeachers(othersResult.data.filter((t: any) => t.id !== parseInt(id || '0')))
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg">教师信息不存在</p>
            <Link to="/teachers" className="text-school-red hover:underline mt-4 inline-block">
              返回教师列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/teachers" className="flex items-center gap-2 text-gray-600 hover:text-school-red transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>返回教师列表</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
                    {teacher.avatar_url ? (
                      <Image
                        src={teacher.avatar_url}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                        aspectRatio="1/1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">{teacher.name}</h1>
                  <p className="text-school-red text-lg mt-2">{teacher.title}</p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-school-red" />
                      <span className="text-gray-600">学科：{teacher.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-school-red" />
                      <span className="text-gray-600">学历：{teacher.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-school-red" />
                      <span className="text-gray-600">荣誉：{teacher.title}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">教学成果</h2>
                <p className="text-gray-700 leading-relaxed">{teacher.achievements}</p>
              </div>
            </div>
          </div>

          {otherTeachers.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">更多教师</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherTeachers.map((t: any) => (
                  <Link
                    key={t.id}
                    to={`/teachers/${t.id}`}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {t.avatar_url ? (
                        <Image
                          src={t.avatar_url}
                          alt={t.name}
                          className="w-full h-full object-cover"
                          aspectRatio="1/1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 hover:text-school-red transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{t.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeacherDetail
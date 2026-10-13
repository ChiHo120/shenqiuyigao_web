import { useState, useEffect } from 'react'
import { Plus, Camera } from 'lucide-react'
import AddPhotoModal from '../components/common/AddPhotoModal'

const campusPhotos = [{ id: 1, title: '沈丘一高校园（示例）', image_url: '/images/placeholder.svg' }]

export default function Campus() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [photos, setPhotos] = useState(campusPhotos)

  useEffect(() => {
    const storedPhotos = localStorage.getItem('sqyg_demo_customCampusPhotos')
    if (storedPhotos) {
      const customPhotos = JSON.parse(storedPhotos)
      setPhotos([...customPhotos, ...campusPhotos])
    }
  }, [])

  const handleAddPhoto = () => {
    setIsModalOpen(true)
  }

  const handleAddPhotoSubmit = (data: { image_url: string }) => {
    const newPhoto = {
      id: Date.now(),
      title: `校园风光${photos.length + 1}`,
      image_url: data.image_url,
    }
    
    try {
      const storedPhotos = localStorage.getItem('sqyg_demo_customCampusPhotos')
      const customPhotos = storedPhotos ? JSON.parse(storedPhotos) : []
      customPhotos.unshift(newPhoto)
      localStorage.setItem('sqyg_demo_customCampusPhotos', JSON.stringify(customPhotos))
      setPhotos([newPhoto, ...photos])
    } catch (error) {
      alert('存储空间不足，请使用较小图片或清理浏览器数据')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">校园照片</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          展示美丽的校园风光，记录师生们的校园生活点滴。
        </p>
        <button
          onClick={handleAddPhoto}
          className="mt-4 inline-flex items-center px-6 py-3 bg-school-red text-white rounded-xl hover:bg-red-700 transition-colors text-lg font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          添加照片
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedImage(photo.image_url)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="校园风光"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}

      <AddPhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPhotoSubmit}
      />
    </div>
  )
}

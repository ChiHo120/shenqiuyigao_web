import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    image: '/images/placeholder.svg',
    title: '创适合学生的教育',
    subtitle: '办人民满意的学校',
    learnMore: '/philosophy',
    videoId: 1,
  },
  {
    image: '/images/placeholder.svg',
    title: '河南省示范性普通高中',
    subtitle: '沈丘县第一高级中学',
    learnMore: '/about',
    videoId: 1,
  },
  {
    image: '/images/placeholder.svg',
    title: '立德树人 全面发展',
    subtitle: '三年培养战略',
    learnMore: '/achievements',
    videoId: 1,
  },
]

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handleLearnMore = (path: string) => {
    navigate(path)
  }

  const handleWatchVideo = () => {
    navigate(`/videos/${currentSlide.videoId}`)
  }

  const currentSlide = slides[currentIndex]

  return (
    <section className="relative h-[86svh] min-h-[620px] max-h-[960px] md:h-[92vh] md:min-h-[720px] overflow-hidden bg-gray-900" aria-label="校园图片轮播">
      <img
        key={currentSlide.image}
        src={currentSlide.image}
        alt={currentSlide.title}
        className="absolute inset-0 w-full h-full object-cover object-center animate-scaleIn"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-32 lg:pb-36">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl text-white">
            <h1 className="text-sm md:text-lg tracking-[0.34em] text-white/80 mb-5 animate-slideIn">
              沈丘县第一高级中学
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg animate-fadeIn">
              {currentSlide.title}
            </h2>
            <p className="mt-3 text-lg md:text-2xl text-white/90 drop-shadow-md animate-slideIn delay-100">
              {currentSlide.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 animate-slideIn delay-200">
              <button type="button" onClick={() => handleLearnMore(currentSlide.learnMore)} className="px-5 py-2.5 bg-school-red text-white font-medium hover:bg-red-700 transition-colors">
                了解学校
              </button>
              <button type="button" onClick={handleWatchVideo} className="px-8 py-4 border border-white/80 text-white text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <span>观看宣传片</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goToPrev}
        aria-label="上一张校园图片"
        className="hidden sm:flex absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/50 bg-black/15 hover:bg-school-red hover:border-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white items-center justify-center text-white transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={goToNext}
        aria-label="下一张校园图片"
        className="hidden sm:flex absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/50 bg-black/15 hover:bg-school-red hover:border-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white items-center justify-center text-white transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 right-6 sm:right-10 lg:right-14 flex items-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`查看第${index + 1}张校园图片`}
            aria-current={index === currentIndex ? 'true' : undefined}
            className={`h-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              index === currentIndex ? 'w-10 bg-white' : 'w-6 bg-white/45 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
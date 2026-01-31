import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiDownload } from 'react-icons/fi'


// --- Types ---
export interface ProjectSlide {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  github?: string; // <--- Made Optional (added ?)
  demo?: string;
  download?: string; // <--- Made Optional (added ?)
}

interface PropType {
  slides: ProjectSlide[]
  options?: any
}

// --- Component ---
const MotionCarousel: React.FC<PropType> = ({ slides, options }) => {
  // ... (Keep the carousel logic exactly the same) ...
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', ...options }, [
    Autoplay({ delay: 4000, stopOnInteraction: true })
  ])

  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: any) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div className="relative w-full max-w-9xl mx-auto px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_85%] md:flex-[0_0_33%] min-w-0 pl-4 relative py-10">
              <SlideCard slide={slide} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={() => emblaApi?.scrollPrev()} className="p-3 rounded-full border border-slate-700 hover:bg-slate-800 hover:border-blue-500 transition-colors text-slate-300">←</button>
        <button onClick={() => emblaApi?.scrollNext()} className="p-3 rounded-full border border-slate-700 hover:bg-slate-800 hover:border-blue-500 transition-colors text-slate-300">→</button>
      </div>
    </div>
  )
}

// --- Individual Card Component ---
const SlideCard = ({ slide }: { slide: ProjectSlide }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative h-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl group flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        <img 
          src={slide.image} 
          alt={slide.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
            {slide.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                    {t}
                </span>
            ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-20 bg-slate-800 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {slide.title}
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-3">
            {slide.description}
        </p>

        {/* Buttons Section */}
        <div className="flex gap-4 mt-auto">
            
            {/* Github Button */}
            {slide.github && (
                <a href={slide.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-700 text-white font-medium hover:bg-slate-600 transition-all border border-transparent hover:border-slate-500">
                    <FiGithub /> GitHub
                </a>
            )}

            {/* Live Demo Button */}
            {slide.demo && (
                <a href={slide.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    <FiExternalLink /> Demo
                </a>
            )}

            {/* 3. NEW: Download File Button */}
            {slide.download && (
                <a 
                    href={slide.download} 
                    download // <--- This attribute forces the browser to download the file
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                >
                    <FiDownload /> File
                </a>
            )}

        </div>
      </div>
    </motion.div>
  )
}

export default MotionCarousel
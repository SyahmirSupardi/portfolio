// src/components/Header.tsx
import { useState } from 'react'
import FadeIn from './FadeIn'
import ProfileCard from './ProfileCard'
import CVModal from './CVModal' // <--- Import the modal

const Header = () => {
  // 1. Add state to control the modal visibility
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)

  return (
    <header className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pt-12 pb-24">
        
        {/* 2. Render the Modal Component here */}
        <CVModal 
            isOpen={isCVModalOpen} 
            onClose={() => setIsCVModalOpen(false)} 
        />

        {/* --- PROFILE CARD (Above Name) --- */}
        <FadeIn delay={0.1} direction="down">
            <div className="mb-8 scale-75 md:scale-90 origin-bottom transform-gpu">
                <ProfileCard
                  name="Syahmir Supardi"
                  title="Junior Data Analyst"
                  handle="syahmir.my"
                  status="Open to Work"
                  contactText="Hire Me"
                  // Using a placeholder - REPLACE with your actual transparent PNG photo for best effect!
                  avatarUrl="/projects/portrait-image.png" 
                  showUserInfo={false} 
                  enableTilt={true}
                  behindGlowColor="rgba(78, 100, 136, 0.6)" 
                  // Update this to scroll to contact section
                  onContactClick={() => window.location.href = '#contact'}
                />
            </div>
        </FadeIn>

        {/* --- TEXT CONTENT (Below Card) --- */}
        <div className="relative z-10">
            <FadeIn delay={0.2} direction="down">
                <h5 className="text-sm font-medium text-slate-300">Hello, I am</h5>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
                <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-wide">
                    Syahmir Supardi
                </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
                <h5 className="text-slate-400 text-lg tracking-widest mb-8">
                    Junior Data Analyst | Aspiring Business Analyst
                </h5>
            </FadeIn>

            <FadeIn delay={0.8}>
                <div className="flex gap-4 justify-center">
                    {/* 3. Update the Download CV button to open the modal */}
                    <button 
                        onClick={() => setIsCVModalOpen(true)}
                        className="px-6 py-3 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] bg-slate-900/50 backdrop-blur-md"
                    >
                        Download CV
                    </button>
                    
                    <a href="#contact" className="px-6 py-3 bg-blue-500 text-slate-900 font-medium rounded hover:bg-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]">
                        Let's Talk
                    </a>
                </div>
            </FadeIn>
        </div>
    </header>
  )
}

export default Header
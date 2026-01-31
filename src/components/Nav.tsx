import { useState } from 'react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BiBook, BiMessageSquareDetail } from 'react-icons/bi'
import { RiServiceLine } from 'react-icons/ri'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')

  const navItems = [
    { id: '#', icon: <AiOutlineHome /> },
    { id: '#about', icon: <AiOutlineUser /> }, // Optional: Create an About section later if you want
    { id: '#experience', icon: <BiBook /> },
    { id: '#portfolio', icon: <RiServiceLine /> },
    { id: '#contact', icon: <BiMessageSquareDetail /> },
  ]

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-max bg-slate-900/50 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex gap-4 z-50 shadow-2xl">
      {navItems.map((item) => (
        <a 
          key={item.id}
          href={item.id} 
          onClick={() => setActiveNav(item.id)}
          className={`p-3 rounded-full text-lg transition-all duration-300 ${activeNav === item.id ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  )
}

export default Nav
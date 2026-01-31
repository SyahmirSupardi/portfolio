import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-900/40 to-slate-900 text-center pt-8 pb-28 mt-12 text-slate-300">
        <a href="#" className="text-2xl font-bold mb-6 inline-block text-blue-400">SYAHMIR SUPARDI</a>
        <div className="mb-4 text-sm font-light text-slate-500">
            <small>&copy; {new Date().getFullYear()}. All rights reserved.</small>
        </div>
    </footer>
  )
}

export default Footer
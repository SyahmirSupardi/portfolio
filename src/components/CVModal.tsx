// src/components/CVModal.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiLock } from 'react-icons/fi'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request delay
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1500)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('form')
      setLoading(false)
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[70] px-4"
          >
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
              >
                <FiX size={20} />
              </button>

              {step === 'form' && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiLock size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Access</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    My CV is protected. Please send a request to download it.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Your Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Your Email</label>
                        <input required type="email" placeholder="john@company.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                        {loading ? 'Sending Request...' : 'Send Request'}
                    </button>
                  </form>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    I have received your request. I will review it and send the CV to your email shortly.
                  </p>
                  <button onClick={handleClose} className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CVModal
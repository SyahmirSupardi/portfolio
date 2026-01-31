import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  fullWidth?: boolean
  padding?: boolean
}

const FadeIn = ({ children, delay = 0, direction = 'up', fullWidth = false, padding = true }: FadeInProps) => {
  
  const xStart = direction === 'left' ? -50 : direction === 'right' ? 50 : 0
  const yStart = direction === 'up' ? 50 : direction === 'down' ? -50 : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: xStart, y: yStart }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      className={`${fullWidth ? 'w-full' : ''} ${padding ? 'px-6' : ''}`}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
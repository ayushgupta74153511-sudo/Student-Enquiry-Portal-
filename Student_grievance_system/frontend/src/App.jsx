import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function App() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  React.useEffect(() => {
    if (token && user) {
      if (user.role === 'student') nav('/student')
      else if (user.role === 'admin') nav('/admin')
      else nav('/department')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-300 text-center overflow-hidden px-4">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow-md"
      >
        🎓 Student Grievance System
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-gray-700 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
      >
        A transparent and efficient way to submit, track, and resolve student grievances effortlessly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-5"
      >
        <button
          onClick={() => nav('/login')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => nav('/register')}
          className="bg-white hover:bg-gray-100 text-blue-800 border border-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Register
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 text-sm text-gray-700"
      >
        © {new Date().getFullYear()} Campus Grievance Portal
      </motion.div>
    </div>
  )
}

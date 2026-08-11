import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success('Login successful!')
      const role = res.data.user.role
      if (role === 'admin') nav('/admin')
      else if (role === 'department') nav('/department')
      else nav('/student')
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">Welcome </h2>
        <p className="text-gray-500 mb-6">Login to access your Grievance Portal</p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-3 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-4 text-sm text-gray-700">
          Don’t have an account?{' '}
          <button
            onClick={() => nav('/register')}
          >
            Register here
          </button>
        </div>
      </motion.div>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const nav = useNavigate()

  
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number & 1 special character.'
      )
      return
    }

    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      await API.post('/auth/register', { name, email, password, role: 'student' })
      toast.success('Registration successful! Please login.')
      nav('/login')
    } catch (err) {
      
      const msg = err.response?.data?.msg
      if (msg?.toLowerCase().includes('email')) {
        setErrorMessage('This email is already registered. Try logging in.')
      } else {
        setErrorMessage('Registration failed. Try again.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-200 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">Create an Account</h2>
        <p className="text-gray-500 mb-6">Register to submit and track your grievances</p>

        {/*  Screen Warning Message */}
        {errorMessage && (
          <p className="text-red-600 font-semibold mb-3 text-sm">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email"
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
              placeholder="Create a strong password"
              required
            />

            {/* Live password rule hint */}
            {!passwordRegex.test(password) && password.length > 0 && (
              <p className="text-xs text-red-500 mt-1">
                Must include 8+ chars, 1 uppercase, 1 lowercase, 1 number & 1 special character
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-3 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </motion.button>
        </form>

        <div className="mt-4 text-sm text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => nav('/login')}
            className="text-white-700 font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  )
}

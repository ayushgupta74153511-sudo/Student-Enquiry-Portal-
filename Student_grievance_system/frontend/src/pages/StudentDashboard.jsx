import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function StudentDashboard() {
  const nav = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div>
      <Navbar />
      <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8">
          Welcome, {user?.name || 'Student'} 👋
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-md">
          <button
            onClick={() => nav('/submit')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105"
          >
            📝 Submit New Grievance
          </button>

          <button
            onClick={() => nav('/my-grievances')}
            className="bg-white border border-blue-600 hover:bg-blue-50 text-blue-700 px-6 py-4 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105"
          >
            📜 My Grievances
          </button>
        </div>

        <div className="text-gray-600 text-sm mt-10">
          Need help? Contact:- 6264149331
        </div>
      </div>
    </div>
  )
}

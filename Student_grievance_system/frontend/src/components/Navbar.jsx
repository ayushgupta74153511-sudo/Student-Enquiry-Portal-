import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  const loc = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const logout = () => {
    localStorage.clear()
    nav('/')
  }

  const goHome = () => {
    if (user?.role === 'admin') nav('/admin')
    else if (user?.role === 'student') nav('/student')
    else if (user?.role === 'department') nav('/department')
  }

  // Active link style
  const activeLink = (path) =>
    loc.pathname === path
      ? 'text-blue-700 font-semibold border-b-2 border-blue-700 pb-1'
      : 'hover:text-blue-700 transition'

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-20">
      {/* Left Side — Logo / Title */}
      <div
        onClick={goHome}
        className="text-xl sm:text-2xl font-extrabold text-blue-700 cursor-pointer tracking-wide"
      >
        🏫 Grievance System
      </div>

      {/* Right Side — Links */}
      <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
        {/* STUDENT NAV OPTIONS */}
        {user?.role === 'student' && (
          <>
            <button onClick={() => nav('/student')} className={activeLink('/student')}>
              Home
            </button>
            <button onClick={() => nav('/submit')} className={activeLink('/submit')}>
              Submit
            </button>
            <button
              onClick={() => nav('/my-grievances')}
              className={activeLink('/my-grievances')}
            >
              My Grievances
            </button>
          </>
        )}

        {/* ADMIN NAV OPTIONS */}
        {user?.role === 'admin' && (
          <>
            <button onClick={() => nav('/admin')} className={activeLink('/admin')}>
              Dashboard
            </button>
            <button
              onClick={() => nav('/admin/analytics')}
              className={activeLink('/admin/analytics')}
            >
              Analytics
            </button>
          </>
        )}

        {/* DEPARTMENT NAV OPTIONS */}
        {user?.role === 'department' && (
          <>
            <button onClick={() => nav('/department')} className={activeLink('/department')}>
            
            </button>
          </>
        )}

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 sm:px-5 sm:py-2 rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

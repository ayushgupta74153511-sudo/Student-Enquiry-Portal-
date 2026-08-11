import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import DepartmentDashboard from './pages/DepartmentDashboard'
import SubmitGrievance from './pages/SubmitGrievance'
import MyGrievances from './pages/MyGrievances'
import AdminAnalytics from './pages/AdminAnalytics'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/department" element={<DepartmentDashboard />} />
      <Route path="/my-grievances" element={<MyGrievances />} />
      <Route path="/submit" element={<SubmitGrievance />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
    </Routes>
  </BrowserRouter>
)

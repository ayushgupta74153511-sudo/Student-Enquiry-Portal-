import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API from '../services/api'
import toast from 'react-hot-toast'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAnalytics()
  }, [])

  async function loadAnalytics() {
    setLoading(true)
    try {
      const res = await API.get('/admin/analytics')
      setAnalytics(res.data.analytics || [])
      toast.success('Analytics loaded successfully')
    } catch (err) {
      toast.error('Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">📊 Admin Analytics Dashboard</h2>

        {loading && <p className="text-gray-600">Loading data...</p>}

        {!loading && analytics.length === 0 && (
          <p className="text-gray-700">No analytics data found.</p>
        )}

        {!loading && analytics.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="w-full h-80 bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Department-Wise Performance</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="departmentName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#2563eb" name="Total Grievances" />
                  <Bar dataKey="avgResolutionHours" fill="#16a34a" name="Avg Resolution (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="w-full h-80 bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Proportion of Grievances per Department</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics}
                    dataKey="count"
                    nameKey="departmentName"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {analytics.map((_, i) => (
                      <Cell
                        key={i}
                        fill={['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

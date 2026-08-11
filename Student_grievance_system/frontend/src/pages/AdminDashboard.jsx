import React, { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts'

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState([])
  const [departments, setDepartments] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAll()
    fetchDepartments()
  }, [])

  async function fetchAll() {
    setLoading(true)
    try {
      const res = await API.get('/grievances')
      setGrievances(res.data || [])
    } catch {
      toast.error('Failed to load grievances')
    } finally { setLoading(false) }
  }

  async function fetchDepartments() {
    try {
      const res = await API.get('/admin/departments')
      setDepartments(res.data)
    } catch (err) { console.error(err) }
  }

  async function forwardToDepartments(gid, selectedIds) {
    if (!selectedIds.length) return toast.error('Select at least one department.')
    await API.post(`/admin/grievances/${gid}/forward`, { departments: selectedIds })
    toast.success('Forwarded successfully.')
    fetchAll()
  }

  async function updateGrievance(gid, data) {
    await API.put(`/admin/grievances/${gid}`, data)
    toast.success('Updated successfully.')
    fetchAll()
  }

  async function loadAnalytics() {
    const res = await API.get('/admin/analytics')
    setAnalytics(res.data.analytics)
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex gap-3 mb-4">
          <button onClick={fetchAll}>🔄 Refresh</button>
        </div>

        {analytics && analytics.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-700"> Department Analytics</h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="w-full h-72">
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
              <div className="w-full h-72">
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
          </div>
        )}

        {loading && <div>Loading...</div>}

        <div className="grid lg:grid-cols-2 gap-4">
          {grievances.map((g) => (
            <div key={g._id} className="bg-white shadow rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                  <p className="text-sm text-gray-600">{g.description}</p>
                </div>
                <span className={`px-3 py-1 rounded text-white ${g.status === 'resolved' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                  {g.status}
                </span>
              </div>

              {/* Attachments */}
              {g.attachments?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Student Attachments:</p>
                  {g.attachments.map((a, i) => (
                    <a key={i} href={`http://localhost:5000${a}`} target="_blank" className="text-blue-600 underline block">
                      File {i + 1}
                    </a>
                  ))}
                </div>
              )}

              {/* Department Proofs */}
              {g.departmentTasks?.some((t) => t.proof) && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Department Proofs:</p>
                  {g.departmentTasks.map((t, i) =>
                    t.proof ? (
                      <a
                        key={i}
                        href={`http://localhost:5000${t.proof}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-600 underline ml-2"
                      >
                        {t.department?.name || 'Dept'} proof
                      </a>
                    ) : null
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <label className="text-sm font-medium">Change Status</label>
                  <select onChange={(e) => updateGrievance(g._id, { status: e.target.value })} defaultValue={g.status}>
                    <option value="open">open</option>
                    <option value="in_progress">in_progress</option>
                    <option value="forwarded">forwarded</option>
                    <option value="resolved">resolved</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select onChange={(e) => updateGrievance(g._id, { priority: e.target.value })} defaultValue={g.priority}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium">Forward to Departments</label>
                <select multiple id={`dept-${g._id}`} className="mt-1 w-full border-gray-300 rounded-md p-1" style={{ minHeight: '80px' }}>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
                <button className="mt-2" onClick={() => {
                  const sel = Array.from(document.getElementById(`dept-${g._id}`).selectedOptions).map(o => o.value)
                  forwardToDepartments(g._id, sel)
                }}>Forward</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

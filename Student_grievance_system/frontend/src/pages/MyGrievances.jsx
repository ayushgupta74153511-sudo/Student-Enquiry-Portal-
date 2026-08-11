import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function MyGrievances() {
  const [list, setList] = useState([])

  useEffect(() => { fetchMyGrievances() }, [])

  async function fetchMyGrievances() {
    try {
      const res = await API.get('/grievances')
      setList(res.data || [])
    } catch (err) {
      alert('Failed to load grievances')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📜 My Submitted Grievances</h2>
      {list.length === 0 && <p>No grievances submitted yet.</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((g) => (
          <div key={g._id} className="bg-white rounded-lg shadow p-4 border">
            <h3 className="text-lg font-semibold text-blue-700">{g.title}</h3>
            <p className="text-gray-700 mb-2">{g.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 text-white rounded ${g.status === 'resolved' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                {g.status}
              </span>
              <span className="text-sm text-gray-500">Priority: {g.priority}</span>
            </div>
            {g.departmentTasks?.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Departments Involved: {g.departmentTasks.map(dt => dt.department?.name).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

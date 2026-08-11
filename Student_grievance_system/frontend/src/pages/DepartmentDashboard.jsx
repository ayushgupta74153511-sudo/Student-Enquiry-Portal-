import React, { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

export default function DepartmentDashboard() {
  const [grievances, setGrievances] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await API.get('/grievances')
      setGrievances(res.data || [])
    } catch {
      alert('Failed to load grievances')
    } finally {
      setLoading(false)
    }
  }

  async function markCompleted(gid, fileId, notesId) {
    try {
      const fd = new FormData()
      const file = document.getElementById(fileId).files[0]
      const notes = document.getElementById(notesId).value
      if (file) fd.append('proof', file)
      if (notes) fd.append('notes', notes)
      await API.post(`/departments/${gid}/resolve`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert('Marked as completed successfully.')
      fetchData()
    } catch {
      alert('Failed to mark completed.')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Department Dashboard
        </h2>

        {loading && <p>Loading...</p>}

        <div className="grid md:grid-cols-2 gap-4">
          {grievances.map((g) => (
            <div key={g._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{g.title}</h3>
                <span
                  className={`px-3 py-1 rounded text-white ${
                    g.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}
                >
                  {g.status}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{g.description}</p>

              {g.departmentTasks?.map((dt) => (
                <div key={dt._id} className="mt-3 border-t pt-2 text-sm text-gray-700">
                  <p>
                    <strong>Task:</strong> {dt.status}
                  </p>
                  <p className="text-xs text-gray-600">
                    Assigned: {new Date(dt.assignedAt).toLocaleString()}
                  </p>

                  {dt.status !== 'completed' && (
                    <div className="mt-2 flex flex-col gap-2">
                      <input type="file" id={`file-${g._id}`} />
                      <input
                        id={`notes-${g._id}`}
                        placeholder="Completion Notes..."
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                      <button
                        onClick={() =>
                          markCompleted(g._id, `file-${g._id}`, `notes-${g._id}`)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                      >
                        ✅ Mark Completed
                      </button>
                    </div>
                  )}

                  {dt.status === 'completed' && (
                    <div className="mt-2 bg-green-50 border p-2 rounded">
                      ✅ Completed at{' '}
                      {dt.resolvedAt
                        ? new Date(dt.resolvedAt).toLocaleString()
                        : 'N/A'}
                      {dt.proof && (
                        <div>
                          <a
                            href={`http://localhost:5000${dt.proof}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Proof
                          </a>
                        </div>
                      )}
                      {dt.notes && <div>Notes: {dt.notes}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

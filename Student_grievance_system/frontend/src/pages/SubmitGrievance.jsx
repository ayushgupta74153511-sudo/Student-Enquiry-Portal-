import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function SubmitGrievance() {
  const nav = useNavigate()
  const [form, setForm] = useState({ title: '', description: '' })
  const [file, setFile] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('description', form.description)
      if (file) fd.append('attachment', file)
      await API.post('/grievances', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      alert('Grievance submitted successfully!')
      nav('/my-grievances')
    } catch (err) {
      alert(err.response?.data?.msg || 'Error')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">📝 Submit a New Grievance</h2>
      <input placeholder="Title" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} required />
      <textarea placeholder="Describe your issue..."
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} required />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit" className="mt-4 w-full">Submit</button>
    </form>
  )
}

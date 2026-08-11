import { Toaster } from 'react-hot-toast'

export default function ToasterConfig() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: { background: '#4ade80', color: '#fff', fontWeight: 'bold' },
        },
        error: {
          style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
        },
      }}
    />
  )
}

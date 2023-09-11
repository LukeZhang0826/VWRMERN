import React from 'react'
import AdminSearchbar from '../adminSearchbar/AdminSearchbar'
import './adminContent.scss'

const AdminContent = ({children}) => {
  return (
      <div className="admin-content-section">
        <AdminSearchbar />
        <div className="admin-content-section-content">
          {children}
        </div>
     </div>
  )
}

export default AdminContent

import React from 'react'
import { Container } from 'react-bootstrap'
import { BiCalendar, BiReceipt, BiSolidDashboard, BiSolidGroup } from 'react-icons/bi'; // Added BiBell for notifications
import { NavLink } from 'react-router-dom';
import './adminSidebar.scss'

const AdminSidebar = ({title, children}) => {
  return (
    <div className="admin-sidebar">
        <div className="admin-sidebar-icon-container">
            <NavLink to="/admin/dashboard">
                <BiSolidDashboard size={30} />
            </NavLink>
            <NavLink to="/admin/scheduler">
                <BiCalendar size={30} />
            </NavLink>
            <NavLink to="/admin/clients">
                <BiSolidGroup size={30} />
            </NavLink>
            <NavLink to="/admin/invoices">
                <BiReceipt size={30} />
            </NavLink>
        </div>
        <div className="admin-sidebar-content-container-title">
            <p>{title}</p>
        </div>

        <div className="admin-sidebar-content-container">
            <div className="admin-sidebar-content-container-content">
                {children}
            </div>
        </div>

        <div className="admin-sidebar-logo">
            <p>Viva</p>
        </div>
    </div>
  )
}

export default AdminSidebar

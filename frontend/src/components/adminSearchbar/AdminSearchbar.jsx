import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { BiSolidBell, BiPlusCircle , BiSearchAlt, BiSolidUser} from 'react-icons/bi'
import './adminSearchbar.scss'

const AdminSearchbar = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options); // Get today's date in the desired format

  return (
    <div className="admin-searchbar-section"> 
        <div className="admin-searchbar-content">
            <div className="admin-searchbar-add-search">
                <Dropdown>
                    <Dropdown.Toggle>
                        Create New
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Client</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Appointment</Dropdown.Item>
                        <Dropdown.Item>Invoice</Dropdown.Item>
                        <Dropdown.Item>Form</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button><BiSearchAlt/> Search</Button>
            </div>
            <div className="admin-searchbar-date">
                <p>Hello! Today is {today}</p> 
            </div>
            <div className="admin-searchbar-icons">
                <a><BiSolidBell size={30}/></a>
                <a><BiSolidUser size={30}/></a>
            </div>
        </div>
    </div>
  )
}

export default AdminSearchbar
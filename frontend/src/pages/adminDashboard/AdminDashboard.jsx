import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import './adminDashboard.scss';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import AdminContent from '../../components/adminContent/AdminContent';

const AdminDashboard = () => {
  return (
    <>
      <AdminSidebar title="DASHBOARD">
        <div>Element 1</div>
        <div>Element 2</div>
        <div>Element 3</div>
      </AdminSidebar>
      <AdminContent>
        <div className="admin-dashboard-grid-container">
          <Card className="admin-dashboard-grid-item">
            <Card.Header>Today's Appointments</Card.Header>
            <Card.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
          <Card className="admin-dashboard-grid-item">
            <Card.Header>Online Booking Requests</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
          <Card className="admin-dashboard-grid-item">
            <Card.Header>Forms and Agreements</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
          <Card className="admin-dashboard-grid-item">
            <Card.Header>Recent Invoices</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
        </div>
      </AdminContent>
    </>
  );
}

export default AdminDashboard;
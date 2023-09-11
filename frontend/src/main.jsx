import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.scss';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux'
import UserPrivateRoute from './components/componentRouting/userPrivateRoute.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './pages/login/LoginPage.jsx';
import ServicePage from './pages/services/ServicePage.jsx';
import TeamPage from './pages/team/TeamPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import ProfileScreen from './pages/profile/ProfilePage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import BookingPage from './pages/booking/BookingPage.jsx';
import AdminDashboard from './pages/adminDashboard/AdminDashboard.jsx';
import AdminScheduler from './pages/adminScheduler/AdminScheduler.jsx';
import AdminBilling from './pages/adminBilling.jsx/AdminBilling.jsx';
import AdminClients from './pages/adminClients/AdminClients.jsx';
import AdminPrivateRoute from './components/componentRouting/AdminPrivateRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App/> }>
      <Route index={true} path='/' element={<HomePage/>} />
      <Route path='/services' element={<ServicePage/>} />
      <Route path='/team' element={<TeamPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />

      {/* Private Routes */}
      <Route path='' element={ <UserPrivateRoute /> }>
        <Route path='/booking' element={<BookingPage/>} />
        <Route path='/profile' element={<ProfileScreen/>} />
      </Route>

      {/* Admin Routes */}
      <Route path='' element={ <AdminPrivateRoute /> }>
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/scheduler' element={<AdminScheduler/>} />
        <Route path='/admin/clients' element={<AdminClients/>} />
        <Route path='/admin/billing' element={<AdminBilling/>} />
      </Route>

      {/* Catch-all route */}
      <Route path='*' element={<HomePage />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>
  </Provider>
)

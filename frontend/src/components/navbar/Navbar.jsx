import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { BiMenu, BiChevronsRight } from 'react-icons/bi';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const topBarRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (window.pageYOffset > topBarRef.current.offsetHeight) {
        const topBarHeight = topBarRef.current.offsetHeight;
        navbarRef.current.style.transform = `translateY(-${topBarHeight}px)`;
        topBarRef.current.style.transform = 'translateY(-100%)';
      } else {
        navbarRef.current.style.transform = 'translateY(0)';
        topBarRef.current.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <><div className='my-navbar-container'>
      <div className="top-bar" ref={topBarRef}>
        <span className="top-bar-item">vivarehab@gmail.com</span>
        <span className="top-bar-item">+1 (647) 352-8688</span>
      </div>
      <div className='my-navbar' ref={navbarRef}>
        <a href="/" className="logo">
          <span className="color-primary">Viva</span> <span className="responsive-logo color-secondary">Wellness & Rehab</span>
        </a>
        <div className="navbar-pages">
          <NavLink to="/" activeclassname="active" className="nav-link">Home</NavLink>
          <NavLink to="/services" activeclassname="active" className="nav-link">Services</NavLink>
          <NavLink to="/team" activeclassname="active" className="nav-link">Team</NavLink>
          <NavLink to="/booking" activeclassname="active" className="nav-link">Booking</NavLink>
        </div>
        <div className="btn-login-menu">
          {userInfo ? (
            <>
            <a href="/profile" className="auth-btn">Profile</a>
            <a onClick={logoutHandler} className="auth-btn">Logout</a>
            </>
          ) : (
            <>
            <a href="/login" className="auth-btn">Login</a>
            <a href="/register" className="auth-btn">Register</a>
            </>
          )}
        <button onClick={() => setIsOpen(!isOpen)} className="auth-btn menu-icon">
          <BiMenu />
        </button>
      </div>
    </div><div className={`menu-side ${isOpen ? 'open' : ''}`}>
        <div onClick={() => setIsOpen(!isOpen)} className="menu-side-back-button nav-link-side">
          <BiChevronsRight />
        </div>
        <NavLink to="/" activeclassname="active-side" className="nav-link-side">Home</NavLink>
        <NavLink to="/services" activeclassname="active-side" className="nav-link-side">Services</NavLink>
        <NavLink to="/team" activeclassname="active-side" className="nav-link-side">Team</NavLink>
        <NavLink to="/booking" activeclassname="active-side" className="nav-link-side">Booking</NavLink>
      </div>
    </div>
    </>
  )
}

export default Navbar;
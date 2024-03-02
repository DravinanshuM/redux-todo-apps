import React, { useRef, useState } from 'react';
import './Header.css';
import { NavLink, } from 'react-router-dom';
import LOGO from '../assets/logo-2.png'; 
import showMessage from './message';

// import dispatch from react-redux.
import { useDispatch } from 'react-redux';
import { add } from '../features/todoSlice';

const Header = () => {

  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const myToDo = useRef();

  // handleChange.
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  }

  // for handleSubmit data from store, here we use onClick.
  const handleSubmit = () => {
    // use some Validations.
    if (inputValue.trim() === "") {
        myToDo.current.focus();
        myToDo.current.style.border = "1px solid red";
        setErrorMessage("Please create Some ToDos...");
        return false;
    } else {
        myToDo.current.focus();
        myToDo.current.style.border = "";
        setErrorMessage("");
        dispatch(add(inputValue));
        setInputValue('');
        showMessage("To Do is added");
        return true;
    }
  }
  
  return (
    <div className='container-fluid mt-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-9 col-md-10 col-12 pt-2 shadow-lg custom'>

          {/* top logo and logo text */}
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-lg-4 col-md-6 col-12 mb-3 d-flex align-items-center justify-content-center justify-content-md-start'>
              <NavLink to="/" className="text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start">
                <img src={LOGO} className='image me-3' alt='error' />
              </NavLink>
            </div>
            <div className='col-lg-8 col-md-6 col-12 align-items-center d-flex justify-content-center justify-content-md-start'> 
              <h3 className='mb-3 ToDoContent'>To Do List</h3>
            </div>
          </div>

          {/* top input field and button */}
          <div className='input-group mb-3'>
            <input className='form-control shadow-none fw-bold' placeholder='What needs to be done?' onChange={handleChange} value={inputValue} ref={myToDo}/>
            <button className='btn btn-info fw-bold mx-3' onClick={handleSubmit}>
                <i className="bi bi-plus-square fs-5"></i>
            </button>
          </div>
          {errorMessage && (
            <p className='text-danger mx-2'>
              <i className="bi bi-x-circle-fill mx-2"></i>
              {errorMessage}
            </p>
          )}

          {/* Navbar start */}
          <div className='mb-4 navbar-container'>
            <nav>
              <ul className='nav nav-underline'>
                <li className='nav-item mx-3'>
                  <NavLink to="/" className="nav-NavLink fs-5">All</NavLink>
                </li>
                <li className='nav-item mx-3'>
                  <NavLink to="/active" className="nav-NavLink fs-5">Active</NavLink>
                </li>
                <li className='nav-item mx-3'>
                  <NavLink to="/complete" className="nav-NavLink fs-5">Complete</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

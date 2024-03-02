import React from 'react';
import './Page.css';
import { useSelector, useDispatch } from 'react-redux';
import { remove, toggleComplete } from '../../features/todoSlice.js';
import showMessage from '../message.js';

const Complete = () => {
  const allData = useSelector((state) => state.todo.data.filter(todo => todo.completed));
  const dispatch = useDispatch();

  // for remove.
  const handleRemove = (id) => {
    dispatch(remove(id));
    showMessage(`To Do is deleted.`);
  }

  // togglerCompletd.
  const togglerCompletd = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
         <div className='col-lg-9 col-md-10 col-12 mb-5 Complete'>
            { allData && allData.length > 0 ? (
               allData.map((item, index) => (
                <div className='d-flex justify-content-between align-items-center bg-white p-2 mb-3' key={index}>
                 <div className="form-check mx-2 align-items-center">
                  <input className="form-check-input shadow-none fs-5 align-items-center" type="checkbox" id={item.id} checked={item.completed} onChange={() => togglerCompletd(item.id)}/>
                  <label
                    htmlFor={item.id}
                    className={`mx-2 form-check-label mx-2 fs-5 ${item.completed ? 'line-through' : ''}`}
                  >
                    {item.text}
                  </label>
                </div>

                  <span className='mx-2'>

                    {/* for remove todo */}
                    <button className='btn btn-sm' type='button' onClick={() => handleRemove(item.id)}>
                        <i className="bi bi-trash3-fill font-icons fs-5"></i>
                    </button>
                  </span>
               </div>
               ))
            ) : (<p className='text-center fs-5 fw-bold'>There is no ToDO's</p>)
            } 
         </div>
      </div>
    </div>
  )
}

export default Complete;

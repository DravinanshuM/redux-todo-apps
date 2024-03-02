import React, { useState } from 'react';
import './Page.css';
import { useSelector, useDispatch } from 'react-redux';
import { remove, update, toggleComplete } from '../../features/todoSlice.js';
import showMessage from '../message.js';

const Home = () => {
  const allData = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState('');
  const [editText, setEditText] = useState('');

  // for remove.
  const handleRemove = (id) => {
    dispatch(remove(id));
    showMessage(`To Do is deleted.`);
  }

  // for edit.
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text); // Initialize editText with the current text
  }

  // handleChange.
  const handleChange = (e) => {
    setEditText(e.target.value);
  }

  // Update the todo with the new text value
  const handleUpdate = () => {
    if(editText.trim() === "") {
      showMessage(`To Do Not Updated..`); 
      return;
    }
    dispatch(update({ id: editId, text: editText }));
    showMessage(`To Do is updated.`);
  }

  // togglerCompletd.
  const togglerCompletd = (id) => {
    dispatch(toggleComplete(id));
  };


  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
         <div className='col-lg-9 col-md-10 col-12 mb-5 home'>
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

                    {/* for edit todo */}
                    <button type="button" className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#EditModal" onClick={() => handleEdit(item.id, item.text)}>
                        <i className="bi bi-pencil-square font-icons-2 fs-5"></i>
                    </button>

                    <div className="modal fade" id="EditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update To Do's</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <label htmlFor='todo' className='form-label fw-bold'>Update To Do</label>
                              <input type='text' className='form-control shadow-none' name='todo' id='todo' value={editText} onChange={handleChange}/>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdate} className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                          </div>
                        </div>
                      </div>
                    </div>

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

export default Home;

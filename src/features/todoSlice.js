import  { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// if local stotage have data then add inside data otherwise empty data.
const storedData = localStorage.getItem('myData');
const initialState = {
    data: storedData ? JSON.parse(storedData) : [
        {
            id: 101,
            text: "default To Do",
            completed: false
        }
    ],
};

const todoSlice = createSlice({
    name: 'ToDOApplications',
    initialState,
    reducers: {
        add: (state, action) => {
            const newTodo = {
                id: uuidv4(),
                text: action.payload,
                completed: false
            }
            state.data.push(newTodo);
            localStorage.setItem('myData', JSON.stringify(state.data));
        },
        remove: (state, action) => {
            state.data = state.data.filter(todo => todo.id !== action.payload);
            localStorage.setItem('myData', JSON.stringify(state.data));
        },
        update: (state, action) => {
            const { id, text } = action.payload;
            // Find the index of the todo item to update.
            const index = state.data.findIndex(todo => todo.id === id);
            if (index !== -1) {
              // Create a new array with the updated todo item
              const newData = state.data.map(todo =>
                todo.id === id ? { ...todo, text: text } : todo
              );
              // Update the state with the new array
              state.data = newData;
              // Update local storage with the updated data
              localStorage.setItem('myData', JSON.stringify(newData));
            }
        },
        toggleComplete: (state, action) => {
            const todoId = action.payload;
            const todoToUpdate = state.data.find(todo => todo.id === todoId);
            if (todoToUpdate) {
              // if true and false, if false then true.
              todoToUpdate.completed = !todoToUpdate.completed;
              localStorage.setItem('myData', JSON.stringify(state.data));
            }
        }
    }
});

export const { add, remove, update, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
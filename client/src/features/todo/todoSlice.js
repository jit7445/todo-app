import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action) => {
      console.log("deletetodo:",action.payload);
      state.todos = state.todos.filter(todo => todo._id !== action.payload)
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload.id)
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    },
    toggleTodo: (state, action) => {
      console.log("action:", action.payload);
      const index = state.todos.findIndex(todo => todo._id === action.payload)
      if (index !== -1) {
        state.todos[index].done = !state.todos[index].done // Toggle the done status
      }
    },
    toggleTodoSuccess: (state, action) => {
      console.log("action:", action.payload);
      const index = state.todos.findIndex(todo => todo._id === action.payload._id)
      if (index !== -1) {
        state.todos[index] = action.payload // Update the entire todo object
      }
    }
  }
})

export const { addTodo, deleteTodo, updateTodo, toggleTodo,toggleTodoSuccess } = todoSlice.actions
export default todoSlice.reducer;
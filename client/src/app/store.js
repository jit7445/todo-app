
import {configureStore} from '@reduxjs/toolkit'
import todoSlice from '../features/todo/todoSlice';
export  const store=configureStore({
  reducer:todoSlice
});
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

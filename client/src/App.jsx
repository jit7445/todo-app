import { useEffect, useRef, useState } from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { addTodo, deleteTodo, updateTodo,toggleTodoSuccess} from './features/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [todos_st,setTodos_st]=useState([])
     const todos= useSelector((state) => state.todos);

  useEffect(()=>{
    setTodos_st(todos);
  },[todos])
useEffect(()=>{
  const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}
  console.log("data",persistedState.todos);
  setTodos_st(persistedState.todos);
  console.log("todos:",todos_st.todos)
},[])
  const BASE_URL = "http://localhost:8000"

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = { "title": inputValue };
    const response = await axios.post(`${BASE_URL}/todos/`, data);
    dispatch(addTodo(response.data));
    setInputValue('');
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onToggle = async (id) => {
    const response = await axios.patch(`${BASE_URL}/todos/${id}`);
    console.log("response:", response);
    dispatch(toggleTodoSuccess(response.data)); // Update the entire todo object
  };

  const onDelete = async (id) => {
    await axios.delete(`${BASE_URL}/todos/${id}`);
    dispatch(deleteTodo(id));
  };

  const onEdit = async (_id, newTitle) => {
    const response = await axios.put(`${BASE_URL}/todos/${_id}`, { title: newTitle });
    dispatch(updateTodo({ _id, data: newTitle }));
    return response;
  };

  return (
    <div className="App bg-Background1 min-h-screen flex flex-col items-center">
    <Header />
    <div className="flex flex-col items-center justify-center w-full p-4 flex-grow">
      <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-1 fixed h-3/4">
        <div className="flex flex-row w-full gap-2 ">
          <form className="form flex flex-row w-full max-w-3xl" onSubmit={onFormSubmit}>
            <input
              ref={inputRef}
              className="w-full max-w-3xl pl-10 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Add Task"
              value={inputValue}
              onChange={onInputChange}
            />
            <Button className="bg-Skyblue text-black w-auto p-2" type="submit">
              Add Task
            </Button>
          </form>
        </div>
        <div className="w-full md:border-t-[8px] sm:border-t-[5px] border-line rounded-lg" />
        <div className="w-full max-w-3xl flex flex-col flex-grow overflow-y-auto z-40 ">
          <TodoList todos={todos_st} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default App;

/* eslint-disable react/prop-types */
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div className='w-full max-w-3xl p-4 space-y-2 bg-Skyblue rounded-lg z-50'>
      <div className='flex flex-col overflow-y-auto space-y-1 z-50'>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

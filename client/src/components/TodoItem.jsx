/* eslint-disable react/prop-types */
import { useState ,useEffect} from 'react';
import { Typography } from '@material-tailwind/react';
import { IconEdit, IconTrash, IconCheck, IconX } from '@tabler/icons-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.data);
  const [todoedit,setTodoedit]=useState(todo);
  // console.log("newtex",newText);
  useEffect(() => {
    setTodoedit(todo);
  }, [todo]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const id=todo._id;
     const resp= await onEdit(id, newText);
      // console.log("resp",resp.data);
      setTodoedit(resp.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewText(todo.data);
  };
console.log("todo",todoedit);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-blue-100 rounded-md shadow-sm">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <Typography variant="h6" className={todoedit.done && 'line-through text-gray-500'}>
  {todoedit.data}
</Typography>
      )}
      <div className="flex items-center space-x-2 flex-row ">
        {isEditing ? (
          <div className='gap-1 flex flex-row'>
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 text-white rounded"
              aria-label="Save"
            >
              <IconCheck size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-red-500 text-white rounded"
              aria-label="Cancel"
            >
              <IconX size={18} />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => onToggle(todoedit._id)}
              className={`p-2 rounded ${todoedit.done ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
              aria-label={todoedit.done ? 'Undo' : 'Complete'}
            >
              {todoedit.done? <IconX size={18} /> : <IconCheck size={18} />}
            </button>
            <button
              onClick={handleEdit}
              className="p-2 bg-yellow-500 text-white rounded"
              aria-label="Edit"
            >
              <IconEdit size={18} />
            </button>
            <button
              onClick={() => onDelete(todoedit._id)}
              className="p-2 bg-red-500 text-white rounded"
              aria-label="Delete"
            >
              <IconTrash size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

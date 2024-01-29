import { useEffect, useState } from 'react';
import './App.css'
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "./firebase";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() =>{
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) =>{
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo })));
    });

    return () => unsubscribe();
  }, []);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  }

  const addTodo = async () => {
    try {
      if(input.trim() !== ''){
        // setTodos([...todos, {id: new Date(), todo: input}]);
        await addDoc(collection(db, 'todos'), {todo: input});
        setInput('');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateTodo = async () => {
    try {
      if(input.trim() !== ''){
        // const updatedTodos = [...todos];
        // updatedTodos[editIndex].todo = input;
        // setTodos(updatedTodos);
        const todoDocRef = doc(db, 'todos', todos[editIndex].id);
        await updateDoc(todoDocRef, {todo: input});
        setEditIndex(-1);
        setInput('');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const removeTodo = async (id) => {
    // let filteredTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(filteredTodos);
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-br from-blue-500 to-pink-500">
        <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <h1 className="text-3xl font-bold text-center mb-4 hover:scale-105 duration-200">Todo App</h1>
          <div className="flex">
            <input type="text" 
            placeholder="Add a Todo" 
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2 bg-gradient-to-br from-blue-200 to-pink-200"
            value={input}
            onChange={(e) => setInput(e.target.value)} />
            <button onClick={editIndex === -1 ? addTodo : updateTodo} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg">{editIndex === -1 ? <FaPlus/> : <FaPencilAlt/>}</button>
          </div>
        </div>

        {todos.length > 0 && (
          <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo,index) =>(
              <li key={index} className="flex items-center justify-between p-3 shadow rounded-md mb-3 bg-gradient-to-br from-blue-300 to-pink-300">
              <span className="text-lg">{todo.todo}</span>
              <div>
                <button onClick={() => setEdit(index)} className="mr-2 p-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-800"><FaPencilAlt /></button>
                <button onClick={() => removeTodo(todo.id)} className="mr-2 p-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800"><FaTrash /></button>
              </div>
            </li>
            ))}
          </ul>
        </div>
        )}

      </div>
    </>
  )
}

export default App

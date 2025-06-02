import { useEffect, useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ToDoListPage from './pages/ToDoListPage'
import ToDoAddEditPage from './pages/ToDoAddEditPage'

import { fetchTodos,addTodoToFirestore,updateTodoInFirestore,deleteTodoFromFirestore
 } from './firebase/todoServices'

function App() {
  const [todos, setTodos] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=> {

    const loadTodos = async ()=>{
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  },[]);

    const addToDo = async (todo) => {
    const newTodo = await addTodoToFirestore(todo);
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (updatedTodo) => {
    await updateTodoInFirestore(updatedTodo);
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  const deleteTodo = async (id) => {
    await deleteTodoFromFirestore(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = async (id) => {
    const toggled = todos.find((t) => t.id === id);
    const updated = { ...toggled, completed: !toggled.completed };
    await updateTodoInFirestore(updated);
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          <Route path='/' element={
            <ToDoListPage 
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          }
          />
          <Route path='/add' element={<ToDoAddEditPage onSave={addToDo} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path='/edit/:id' element={<ToDoAddEditPage todos={todos} onSave={updateTodo} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App

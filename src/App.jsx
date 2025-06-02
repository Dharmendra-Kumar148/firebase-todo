import { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import ToDoListPage from './pages/ToDoListPage';
import ToDoAddEditPage from './pages/ToDoAddEditPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

import {
  fetchTodos,
  addTodoToFirestore,
  updateTodoInFirestore,
  deleteTodoFromFirestore,
} from './firebase/todoServices';

import { auth } from './firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      if (user) {
        const data = await fetchTodos();
        setTodos(data);
      }
    };
    loadTodos();
  }, [user]);

  const handleLogout = async () => {
  await signOut(auth);
  setUser(null);
};

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
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />

          {user ? (
            <>
              <Route
                path="/"
                element={
                  <ToDoListPage
                    todos={todos}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    onLogout={handleLogout}
                    user={user}
                  />
                }
              />
              <Route
                path="/add"
                element={
                  <ToDoAddEditPage
                    onSave={addToDo}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ToDoAddEditPage
                    todos={todos}
                    onSave={updateTodo}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const ToDoAddEditPage=({todos=[],onSave, darkMode, toggleDarkMode})=>{
    const {id} = useParams();
    const navigate=useNavigate();
    const location=useLocation();

    const editingTodo= location.state?.todo || null;

    const [title, setTitle]=useState('');

    // if editing, pre-fill title
    useEffect(()=>{
        if (editingTodo) {
            setTitle(editingTodo.title);
        }
    },[editingTodo]);

    const handleSubmit=(e)=> {
        e.preventDefault();
        const todoData= {
            id:editingTodo ?String( editingTodo.id):String(Date.now()),
            title,
            completed:editingTodo ? editingTodo.completed:false,
        };

        onSave(todoData)

        navigate("/");

    };


    return(
        <div style={{
            padding:"20px",
            backgroundColor: darkMode ? "#121212" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
            minHeight: "100vh",
            }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>{editingTodo ? "✏️ Edit Todo":"➕ Add Todo"}</h2>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    style={{
                        padding:"10px",
                        width:"80%",
                        marginBottom:"10px",
                        borderRadius:"6px",
                        border: "1px solid #ccc",
                        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                        color: darkMode ? "#fff" : "#000",
                    }}
                />
                <br />
                <button 
                    type="submit"
                    style={{
                        padding:"10px 20px",
                        backgroundColor: "#4CAF50",
                        color:"white",
                        border:"none",
                        borderRadius:"6px",
                        marginTop:"10px",
                    }}
                >Save</button>
            </form>
        </div>
    );
};

export default ToDoAddEditPage
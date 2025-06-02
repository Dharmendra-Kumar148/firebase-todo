import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import ToDoItem from "../components/ToDoItem";

const ToDoListPage=({todos, onDelete, onToggle, darkMode, toggleDarkMode})=>{
    const navigate = useNavigate();

    const onEdit =(todo)=>{
        navigate(`/edit/${todo.id}`,{state:{todo}});
    };
    return(
        <div style={{
            backgroundColor:darkMode?"#121212":"#ffffff",
            color: darkMode?"#f1f1f1":"#000000",
            minHeight:"100vh",
            padding:"20px",
        }}>
            <div style={{
                display:"flex",justifyContent:"space-between"
            }}>
                <h2>📝 Todo List</h2>
                <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </div>

            <button 
                onClick={()=>navigate("/add")}
                style={{
                    marginTop:"10px",
                    marginBottom:"20px",
                    padding:"10px 20px",
                    borderRadius:"6px",
                    backgroundColor:darkMode?"#1E88E5":"#4CAF50",
                    color:"white",
                    border:"none",
                    cursor:"pointer"
                }}
            >➕ Add Todo</button>

            {todos.length === 0 ? (
                <p>No todos yet!</p>
            ):(
                todos.map((todo)=>(
                    <ToDoItem 
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        darkMode={darkMode}
                     />
                ))
            )}
        </div>
    );
};

export default ToDoListPage
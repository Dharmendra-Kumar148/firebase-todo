const ToDoItem=({todo, onDelete, onToggle, onEdit, darkMode})=>{
    return(
        <div 
            style={{
                padding:"10px",
                margin:"8px 0",
                borderRadius:"8px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                backgroundColor:darkMode?"#1e1e1e":"#f9f9f9",
                color:darkMode?"#ffffff":"#000000"
                }}>
            
            <div>
                <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=>onToggle(todo.id)}        
                />
                <span 
                    style={{
                        textDecoration: todo.completed?"line-through":"none",
                        marginLeft: "10px",
                    }}
                >{todo.title}</span>
            </div>
            <div>
                <button onClick={()=>onEdit(todo)}>✏️</button>
                <button onClick={()=>onDelete(todo.id)} style={{marginLeft:"5px"}}>🗑️</button>
            </div>

        </div>
    );
};

export default ToDoItem
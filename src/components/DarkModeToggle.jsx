const DarkModeToggle=({darkMode,toggleDarkMode})=>{
    return(
        <button 
            onClick={toggleDarkMode}
            style={{
                padding:"10px 15px",
                margin:"10px",
                borderRadius:"8px",
                backgroundColor: darkMode? "#333" : "#eee",
                color: darkMode ? "#fff" : "#000",
                border: "none",
                cursor:"pointer",
                transition:"all 0.3s ease",
                boxShadow:darkMode?"0 0 10px rgba(255,255,255,0.2)":"0 0 5px rgna(0,0,0,0.1)"
            }}
           
        >{darkMode? "☀️":"🌙"}</button>
    );
};

export default DarkModeToggle
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
        <div style={styles.card}>
           <h2 style={styles.heading}>🔓 Sign In</h2> 
           <form onSubmit={handleSignIn}>
      
      <input type="email" placeholder="Email" value={email}
       onChange={e => setEmail(e.target.value)} 
       required
       style={styles.input}
       />
      <input type="password" placeholder="Password" value={password} 
       onChange={e => setPassword(e.target.value)} 
       required
       style={styles.input}
       />
      <button type="submit"  style={styles.button}>Sign In</button>
    </form>
    <p style={styles.text}>New user? <a href="/signup">Sign Up</a></p>
        </div>    
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f1f1f1",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    width: "100%",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "12px 20px",
    width: "100%",
    background: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  text: {
    marginTop: "16px",
    textAlign: "center",
  }
};

export default SigninPage;

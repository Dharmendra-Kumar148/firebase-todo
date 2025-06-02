import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect after signup
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
        <div style={styles.card}>
            <h2 style={styles.heading}>🔐 Sign Up</h2>
<form onSubmit={handleSignup} style={{ padding: "20px" }}>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={styles.input}
      /><br /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Sign Up</button>
    </form>
    <p style={styles.text}>Already have an account? <a href="/signin">Sign In</a></p>
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

export default SignupPage;

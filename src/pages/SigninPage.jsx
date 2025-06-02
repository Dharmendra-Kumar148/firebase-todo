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
    <div style={{ padding: "20px" }}>
    <form onSubmit={handleSignIn}>
      <h2>🔓 Sign In</h2>
      <input type="email" placeholder="Email" value={email}
       onChange={e => setEmail(e.target.value)} 
       required
       style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
       />
      <input type="password" placeholder="Password" value={password} 
       onChange={e => setPassword(e.target.value)} 
       required
       style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
       />
      <button type="submit"  style={{ padding: "10px 20px" }}>Sign In</button>
    </form>
    <p>New user? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SigninPage;

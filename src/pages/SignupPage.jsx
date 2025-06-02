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
    <div>
    <form onSubmit={handleSignup} style={{ padding: "20px" }}>
      <h2>🔐 Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      /><br /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{padding:"10px", width:"100%", marginBottom:"10px"}}
      /><br /><br />
      <button type="submit" style={{padding:"10px 20px"}}>Sign Up</button>
    </form>
    <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default SignupPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


let API = "http://localhost:3000/api/";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let json = await response.json();
      
      setSuccessMessage(json.message);
      console.log(json.message)
      console.log(json)
      setEmail("");
      setPassword("");
      props?.setToken(json.token);

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      {successMessage && <p>{successMessage}</p>}
      {/* {error && <p>{error}</p>} */}


      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label>Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-options">
          <button type="submit">Login</button>
          {successMessage ? (
            <Link to="/ticketForm">Go to Ticket Form</Link>
          ) : (
            <Link to="/register">Don't have an account?</Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

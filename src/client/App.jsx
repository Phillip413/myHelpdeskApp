import { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>My App</h1>
      <Login />
      <Register />
    </div>
  );
}

export default App;

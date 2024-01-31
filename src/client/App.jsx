import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import TicketForm from "./components/TicketForm";

import axios from "axios";

let API = "http://localhost:3000/api/";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [tickets, setTickets] = useState([]);


  function isAdmin() {
    return user?.role === "ADMIN";
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>IT Helpdesk Ticketing System</h1>
        <nav>
          <Link to = "/" className="nav-link">
            Home
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/ticketForm" className="nav-link">
            Submit a Ticket!
          </Link>
        </nav>
      </header>
      {isAdmin() ? <AdminFooter token={token} user={user} /> : <></>}

      <Routes>
        <Route path="/" element={<HomePage token={token} setToken={setToken}/>}/>
        <Route path="/login" element={<Login token={token} setToken={setToken}/>}/>
        <Route path="/ticketForm" element={<TicketForm token={token} setToken={setToken}/>}/>
        <Route path="/register" element={<Register token={token} setToken={setToken} />}/>

      </Routes>
    </div>
  );
}

export default App;

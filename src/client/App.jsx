import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import TicketForm from "./components/TicketForm";
import AllTickets from "./components/AllTickets";
import AllUsers from "./components/AllUsers";
import AdminFooter from "./components/AdminFooter";
import SingleTicket from "./components/SingleTicket";



import axios from "axios";

let API = "http://localhost:3000/api/";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [token]);

  async function fetchUser() {
    try {
      const response = await fetch(`${API}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json()
      setUser(json);

      console.log("user check: ", json)

    } catch (error) {
      setError(error.message);
      console.log(error)
    }
  }

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

          {token && !isAdmin() ? 
            <Link to="/ticketForm" className="nav-link">
              Submit Ticket
            </Link> 
          :
            <></>  
          }
          
        </nav>
      </header>
      {isAdmin() ? <AdminFooter token={token} user={user} /> : <></>}

      <Routes>
        <Route path="/ticketForm" element={<TicketForm token={token} setToken={setToken} user={user} setUser={setUser}/>}></Route>
        <Route path="/" element={<HomePage token={token} setToken={setToken} user={user}/>}></Route>
        <Route path="/login" element={<Login token={token} setToken={setToken} user={user}/>}></Route>
        <Route path="/register" element={<Register token={token} setToken={setToken} user={user}/>}></Route>

        <Route path="/admin/tickets" element={<AllTickets token={token} user={user}/>}></Route>
        <Route path="/admin/users" element={<AllUsers token={token} user={user} />}></Route>
        <Route path="/admin/tickets/:id" element={<SingleTicket token={token} setToken={setToken} user={user} />} />

      </Routes>
    </div>
  );
}

export default App;

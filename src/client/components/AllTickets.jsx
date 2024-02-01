import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function AllTickets(props) {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    try {
      const { data: json } = await axios.get(`${API}/tickets`, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });
      setTickets(json);
    } catch (error) {
      console.error("Unable to find tickets: ", error.message);
    }
  }

  return (
    <div>
      <div>
      {/* <h2>All Tickets</h2> */}
      <ul className="tickets-container">
        {tickets.length ? (
          tickets.map((ticket) => (
            <li key={ticket.id} className="all-tickets-details">
              <h2>Ticket #{ticket.id}</h2>
              <p>{ticket.content}</p>
              <button onClick={() => navigate(`/admin/tickets/${ticket.id}`)}>
                Show Details
              </button>
            </li>
          ))
          ) : (
            <h2>Loading ...</h2>
          )
        }
      </ul>
      </div>
    </div>
  );
}

export default AllTickets;

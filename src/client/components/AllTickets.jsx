import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function AllTickets({ tickets, setTickets }) {
  const navigate = useNavigate();
  const [originalTickets, setOriginalTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    let API = "http://localhost:3000/api/tickets";

    try {
      const { data: response } = await Axios.get(`${API}`);
      setTickets(response);
      setOriginalTickets(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleShowAll = () => {
    fetchTickets();
  };

  return (
    <div>

        <ul className="tickets-container">
          {tickets.length ? (
            tickets.map((ticket) => (
              <li key={ticket.id} className="all-tickets-details">
                <h2>{ticket.userID}</h2>
                <p>{ticket.content}</p>
                <button onClick={() => navigate(`/tickets/${ticket.id}`)}>
                  Show Details
                </button>
              </li>
            ))
          ) : (
            <h2>Loading ...</h2>
          )}
        </ul>
    </div>
  );
}

export default AllAlbums;

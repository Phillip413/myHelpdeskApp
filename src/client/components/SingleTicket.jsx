import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleTicket(props) {
  const [ticket, setTicket] = useState({});
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleTicket();
    fetchUser();
  }, []);

  async function fetchSingleTicket() {
    try {
      const { data: json } = await axios.get(`${API}/tickets/${id}`);

      setTicket(json);
  
    } catch (error) {
      console.error("Unable to find that ticket: ", error.message);
    }
  }

  async function fetchUser() {
    try {
      const { data: json } = await axios.get(`${API}/tickets/info`, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });
      setUser(json);
    } catch (err) {}
  }

  function isAdmin() {
    return user.role === "ADMIN";
  }

  return (
    <div className="single-ticket">
      <div className="single-ticket-flex">

        <div className="ticket-info">
          <h2 className="ticket-userID">UserID: {ticket.userid}</h2>
          <p className="ticket-status">Status: {ticket.ticketstatus}</p>
          <p className="album-date">Time of Submission: {ticket.ticketdate}</p>
          <p className="ticket-content">Issue: {ticket.content}</p>
        </div>

        {/* <form onSubmit={changeStatus}>
          <div>
            <label>Change Status to: </label>
            <input
              type="text"
              value={ticket.status}
              onChange={(event) => setTicketStatus(event.target.value)}
            />
          </div>
          <button type="submit">Change Status</button>
        </form> */}

      </div>
    </div>

  
  );
}

export default SingleTicket;

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleTicket(props) {
  const [ticket, setTicket] = useState({});
  const [user, setUser] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState("Not Yet Reviewed")



  const { id } = useParams();

  useEffect(() => {
    fetchSingleTicket();
    fetchUser();
  }, [props?.token]);

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

  //
  async function saveStatus() {
    event.preventDefault()
    try {
      const response = await fetch(`${API}/tickets/${ticket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
        body: JSON.stringify({
          ticketStatus: updatedStatus,
        }),
      });

      const json = await response.json();
      console.log("patch request response ",json)
      fetchSingleTicket()

    } catch (error) {
      console.error(error.message);
    }
  }
  //
  
  console.log("updated status: ",updatedStatus)

  return (
    <div className="single-ticket">
      <div className="single-ticket-flex">

        <div className="ticket-info">
          <h2 className="ticket-userID">UserID: {ticket.userid}</h2>
          <p className="ticket-status">Status: {ticket.ticketstatus}</p>
          <p className="album-date">Time of Submission: {ticket.ticketdate}</p>
          <p className="ticket-content">Issue: {ticket.content}</p>
        </div>

        <form onSubmit={saveStatus} >
          <label>Update Status: </label>
          <select value={updatedStatus} onChange={event => setUpdatedStatus(event.target.value)}>
            <option value="Not Yet Reviewed">Not Yet Reviewed</option>
            <option value="In-Progress">In-progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Save Changes</button>
        </form>

      </div>
    </div>

  
  );
}

export default SingleTicket;

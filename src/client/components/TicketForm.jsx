import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function TicketForm(props) {

  const [userID, setUserID] = useState(props.user.id)
  const [content, setContent] = useState("");
  const [ticketStatus, setTicketStatus] = useState("Not Yet Reviewed")
  const [ticketDate, setTicketDate] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let response = await fetch(`${API}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
        body: JSON.stringify({
          userID: userID,
          content: content,
          ticketStatus: ticketStatus,
          ticketDate: ticketDate,
        }),
      });

      setSuccessMessage("You have successfully submitted a help ticket! IT Support will review the entry and send an email shortly.")
      setContent("")
      setTicketDate("")

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form className="add-ticket-form" onSubmit={handleSubmit}>
      {successMessage && <p>{successMessage}</p>}
      <h2>Submit a Ticket</h2>

      <p>Hello {props.user.role}: {props.user.name},</p>
      <p>{props.user.email}</p>

      <br />

      <label>
        Issue:
        <input
          type="text"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>

      <br />

      <label>
        Ticket Date:
        <input
          type="date"
          name="ticketDate"
          value={ticketDate}
          onChange={(event) => setTicketDate(event.target.value)}
        />
      </label>

      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default TicketForm;
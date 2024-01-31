import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function TicketForm(props) {
  const [formData, setFormData] = useState({
    userID: props.user.id,
    name: props.user.name,
    content: "",
    ticketStatus: "",
    ticketDate: "",
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.ticketDate = new Date(formData.ticketDate).getFullYear();
    const response = await axios.post(`${API}/tickets`, formData, {
      headers: {
        Authorization: `Bearer ${props?.token}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      navigate("/");
    }
  };

  return (
    <form className="add-ticket-form" onSubmit={handleSubmit}>
      <h2>Submit a Ticket</h2>
      <label>
        userID: {formData.name}
      </label>

      <br />

      <label>
        content
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Ticket Date:
        <input
          type="date"
          name="ticketDate"
          value={formData.ticketDate}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default TicketForm;
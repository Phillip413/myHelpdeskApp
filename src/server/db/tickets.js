const client = require("./client");

const createTicket = async ({ userID, content, ticketStatus, ticketDate }) => {
  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
      INSERT INTO tickets(userID, content, ticketStatus, ticketDate)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [userID, content, ticketStatus, ticketDate]
    );

    return ticket;
  } catch (error) {
    console.error("Unable to create ticket. ", error.message);
    throw error;
  }
};

// Database Functions
async function getAllTickets() {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM tickets; 
      `
    );
    return rows;
  } catch (error) {
    console.error("Could not get all tickets: ", error.message);
    throw error;
  }
}

//get ticket by id
async function getTicket(id) {
  try {
    const {
      rows: [ticket],
    } = await client.query("SELECT * FROM tickets WHERE id=$1", [id]);
    return ticket;
  } catch (error) {
    throw error;
  }
}

async function deleteTicketById(id) {
  try {
    const { rows } = await client.query(
      "DELETE FROM tickets WHERE id=$1 RETURNING *",
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateTicket(id, {ticketStatus}) {
  try {
    const { rows: updatedTicket } = await client.query(
      `
      UPDATE tickets
      SET ticketstatus = $3
      WHERE id = $1
      RETURNING *
      `,
      [id, ticketStatus]
    );

    if (!updatedTicket) {
      throw new Error("Ticket not found");
    }

    return updatedTicket;
  } catch (error) {
    console.error("Unable to update ticket.", error.message);
    throw error;
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getTicket,
  deleteTicketById,
  updateTicket,
};

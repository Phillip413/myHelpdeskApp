const client = require("./client");

const createTicket = async ({ userid, content, ticketStatus, ticketDate }) => {
  try {
    const {
      rows: [ticket],
    } = await client.query(
      `
      INSERT INTO albums(userid, content, ticketstatus, ticketdate)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [userid, content, ticketStatus, ticketDate]
    );

    return ticket;
  } catch (err) {
    console.error("Unable to create ticket. ", err.message);
    throw err;
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
  } catch (err) {
    console.error("Could not get all tickets: ", err.message);
    throw err;
  }
}

//get ticket by id
async function getTicket(id) {
  try {
    const {
      rows: [ticket],
    } = await client.query("SELECT * FROM tickets WHERE id=$1", [id]);
    return ticket;
  } catch (err) {
    throw err;
  }
}

async function deleteTicketById(id) {
  try {
    const { rows } = await client.query(
      "DELETE FROM tickets WHERE id=$1 RETURNING *",
      [id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function updateTicket(id, updatedFields) {
  try {
    const { rows: updatedTicket } = await client.query(
      `
      UPDATE tickets
      SET userid = $1, content = $2, ticketstatus = $3, ticketdate = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        updatedFields.userid,
        updatedFields.content,
        updatedFields.ticketStatus,
        updatedFields.ticketDate,
        id,
      ]
    );

    if (!updatedTicket || updatedTicket.length === 0) {
      throw new Error("Ticket not found");
    }

    return updatedTicket;
  } catch (err) {
    console.error("Unable to update ticket.", err.message);
    throw err;
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getTicket,
  deleteTicketById,
  updateTicket,
};

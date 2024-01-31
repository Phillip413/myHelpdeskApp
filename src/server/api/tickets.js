const express = require("express")
const ticketRouter = express.Router();
const { isLoggedIn } = require("./roles");


const {
  getTicket,
  deleteTicketById,
  getAllTickets,
  createTicket,
  updateTicket,
} = require("../db/tickets");

// GET /api/tickets/:id
ticketRouter.get("/:id", async (req, res, next) => {
  try {
    const ticket = await getTicket(req.params.id);
    res.send(ticket);
  } catch (err) {
    next(err);
  }
});

// GET /api/tickets/
ticketRouter.get("/", async (req, res, next) => {
  try {
    const tickets = await getAllTickets();
    res.send(tickets);
  } catch (error) {
    console.error("Could not get all tickets: ", err.message);
    throw err;
  }
});

// POST
ticketRouter.post("/", isLoggedIn("user"), async (req, res, next) => {
  try {
    const { userID, content, ticketStatus, ticketDate} = req.body;

    if (!userID) {
      return res
        .status(400)
        .json({ message: "userID is required to add ticket." });
    }

    const newTicket = await createTicket({
      userID: userID,
      content: content,
      ticketStatus: ticketStatus,
      ticketDate: ticketDate,
    });

    res
      .status(201)
      .json({ message: "Ticket added successfully", ticket: newTicket });
  } catch (err) {
    next(err);
  }
});

// PATCH
ticketRouter.patch("/:id", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const updatedTicket = await updateTicket(req.params.id, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({
      message: "Ticket updated successfully",
      comment: updatedTicket,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/albums/:id
ticketRouter.delete("/:id", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const deletedTicket = await deleteTicketById(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not Found" });
    }
    res.json({
      message: "Ticket deleted Successfully",
      comment: deletedTicket,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = ticketRouter;

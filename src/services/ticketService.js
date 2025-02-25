import { ticketModel } from "../dao/models/ticket.js";
import { v4 as uuidv4 } from "uuid";

export class TicketService {
  async createTicket(purchaser, amount) {
    try {
      const newTicket = new ticketModel({
        code: uuidv4(),
        amount,
        purchaser
      });
      await newTicket.save();
      return newTicket;
    } catch (error) {
      throw new Error("Error al generar el ticket");
    }
  }
}

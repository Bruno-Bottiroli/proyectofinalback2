// src/services/ticket.service.js
import Ticket from '../models/ticket.model.js';  // Importación por defecto


export class TicketService {
  async createTicket(ticketData) {
    // Lógica para crear el ticket
    const newTicket = new Ticket(ticketData);
    await newTicket.save();
    return newTicket;
  }
}

export const ticketService = new TicketService();

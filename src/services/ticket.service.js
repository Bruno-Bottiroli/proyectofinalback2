import Ticket from '../models/ticket.model.js'

export class TicketService {
  async createTicket(ticketData) {
    
    const newTicket = new Ticket(ticketData)
    await newTicket.save()
    return newTicket
  }
}

export const ticketService = new TicketService()
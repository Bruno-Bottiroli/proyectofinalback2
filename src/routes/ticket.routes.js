
import { Router } from 'express'
import { ticketService } from '../services/ticket.service.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()


router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTicket = await ticketService.createTicket(req.body)
    res.status(201).json(newTicket)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ticket', error })
  }
});

export default router

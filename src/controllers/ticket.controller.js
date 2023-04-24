import ticketsService from "../services/tickets.service.js";

class TicketController {

    async findTicketByOrder(req, res) {
        try {
            const { order } = req.body
            const ticket = await ticketsService.findTicketByOrder(order)
            req.json(ticket)

        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }

    async generateTicket(req, res) {
        try {
            const { cid } = req.params
            const { email } = req.body

            const ticket = await ticketsService.generateTicket(cid, email)
            res.json(ticket)
        } catch (error) {
            res.json({
                message: "Error",
                error
            })
        }
    }
}

const ticketController = new TicketController()
export default ticketController
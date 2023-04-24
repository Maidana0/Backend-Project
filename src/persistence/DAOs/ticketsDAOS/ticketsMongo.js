import { ticketsModel } from "../../mongoDB/models/tickets.model.js";
import BasicMongo from "../basicMongo.js";


class TicketsMongo extends BasicMongo {
    constructor() {
        super(ticketsModel)
    }

    async findTicketByOrder(order) {
        try {
            const response = await this.model.find({code: order})
            return response
        } catch (error) {
            return error
        }
    }

}

const ticketsMongo = new TicketsMongo()
export default ticketsMongo

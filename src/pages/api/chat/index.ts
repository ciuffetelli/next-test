import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";

export default (request: NextApiRequest, response: NextApiResponseServerIO) => {
    if(request.method === "POST"){
        const data = request.body

        response?.socket?.server?.io?.emit(data.event, data)

        response.status(201).json(data)
    }
}
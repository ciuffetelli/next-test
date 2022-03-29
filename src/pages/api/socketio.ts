import { NextApiRequest } from "next"
import { NextApiResponseServerIO } from "../../types/next"
import { Server as ServerIO } from "socket.io"
import { Server as NetServer } from "http"

export const config = {
    api: {
        bodyParcer: false
    }
}

export default async (request: NextApiRequest, response: NextApiResponseServerIO) => {
    if(!response.socket.server.io) {
        
        process.stdout.write("New Socket...")
        const httpServer: NetServer = response.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        })

        response.socket.server.io = io
    }

    response.end()
}
import {Server} from "../../Server";
import {Socket} from "socket.io";
import {MessageSockets} from "./socketCommunication/MessageSockets";
import {RoomSockets} from "./socketCommunication/RoomSockets";

export class SocketService {
    constructor() {
    }

    static setup() {
        Server.io.on('connection', (socket: Socket) => {
            RoomSockets.joinRoom(socket);
            MessageSockets.chatMessage(socket);
        })
    }
}

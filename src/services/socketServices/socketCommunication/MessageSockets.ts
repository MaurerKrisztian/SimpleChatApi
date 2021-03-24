import {Socket} from "socket.io";
import {Server} from "../../../Server";
import {Utils, IMessage} from "../../../utils/Utils";
import {UserService} from "../../UserService";
import {Constants} from "../../../utils/Constants";

export class MessageSockets {
    constructor() {
    }

    static chatMessage(socket: Socket) {
        socket.on(Constants.MESSAGE.MESSAGE_LISTENER, msg => {
            const user = UserService.getUserById(socket.id)
            if (!user) {
                return;
            }
            MessageSockets.sendMessageToRoom(socket, user.room, Utils.formatMessage(user.username, msg));
        })
    }

    static sendMessageToRoom(socket: Socket, room: string, message: IMessage){
        Server.io.to(room).emit(Constants.MESSAGE.SEND_MESSAGE, message);
    }

}

import {Socket} from "socket.io";
import {Utils} from "../../../utils/Utils";
import {Constants} from "../../../utils/Constants";
import {MyLogger} from "../../../Logger";
import {IChatUser, UserService} from "../../UserService";
import {RoomSockets} from "./RoomSockets";
import {MessageSockets} from "./MessageSockets";

export class ConnectionSockets {
    constructor() {
    }

    static connect(socket: Socket, user: IChatUser) {
        socket.emit(Constants.MESSAGE.SEND_MESSAGE, Utils.formatMessage(Constants.CHATBOT_NAME, 'Welcome to SupportLiveChat'));
        socket.broadcast.to(user.room).emit(Constants.MESSAGE.SEND_MESSAGE, Utils.formatMessage(Constants.CHATBOT_NAME, user.username + ' has joined the chat')); // send all the client except the current
        MyLogger.trace("client connected");
    }

    static disconnect(socket: Socket, user: IChatUser) {
        socket.on('disconnect', () => {
            MyLogger.trace(user.username + ' has left the chat')

            MessageSockets.sendMessageToRoom(socket, user.room, Utils.formatMessage(Constants.CHATBOT_NAME, user.username + ' has left the chat'))
            UserService.leaveUser(user.socketId);
            RoomSockets.updateRoomUsers(user)
        });

    }
}

import {Socket} from "socket.io";
import {IChatUser, UserService} from "../../UserService";
import {ConnectionSockets} from "./ConnectionSockets";
import {Server} from "../../../Server";
import {Constants} from "../../../utils/Constants";

export class RoomSockets {
    constructor() {
    }

    static joinRoom(socket: Socket){
        socket.on(Constants.JOIN_ROOM, (joinRoomReq: IJoinRoom) => {
            const user = UserService.joinUser(socket.id, joinRoomReq.username, joinRoomReq.room)
            socket.join(user.room)

            RoomSockets.updateRoomUsers(user)
            ConnectionSockets.connect(socket, user);
            ConnectionSockets.disconnect(socket, user);
        })
    }

    static updateRoomUsers(user: IChatUser){
        Server.io.to(user.room).emit(Constants.ROOM_USERS, {
            room: user.room,
            users: UserService.getRoomUsers(user.room)
        })
    }
}


export interface IJoinRoom{
    username: string,
    room: string
}

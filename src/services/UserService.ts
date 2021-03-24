export class UserService {
    static users: IChatUser[] = []

    constructor() {
    }

    static joinUser(id: string, username: string, room: string) {
        const user: IChatUser = {
            socketId: id, username: username, room: room
        }
        this.users.push(user);
        return user;
    }

    static getUserById(id: string) {
        return this.users.find(user => user.socketId === id)
    }

    static leaveUser(id: string) {
        this.users = this.users.filter((user) => {
            return user.socketId !== id;
        })
    }

    static getRoomUsers(room: string) {
        return this.users.filter((user) => {
            return user.room == room;
        })
    }

}

export interface IChatUser {
    socketId: string,
    username: string,
    room: string
}

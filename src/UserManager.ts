import { connection } from "websocket";
import { OutgoingMessage } from "./messages/outgoingMessages";
interface User {
    name: string;
    id: string;
    conn: connection
}

interface Room {
    users: User[];
}

export class UserManager {
    private rooms: Map<string, Room>
    constructor() {
        this.rooms = new Map<string, Room>
    }

    addUser(userId: string, roomId: string, socket: connection, name: string) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            })
        }
        this.rooms.get(roomId)?.users.push({
            id: userId,
            name,
            conn: socket
        })
        // console.log(this.rooms.get(roomId)?.users)
    }
    removeUser(roomId: string, userId: string) {

        const users = this.rooms.get(roomId)?.users;
        if (users) {
            users.filter(({ id }) => id !== userId);
        }
    }

    getUser(userId: string, roomId: string): User | null {
        // console.log(this.rooms.get(roomId)?.users);
        const user = this.rooms.get(roomId)?.users.find(({ id }) => id == userId);
        return user ?? null;
    }

    broadcast(roomId: string, userId: string, message: OutgoingMessage) {
        const user = this.getUser(roomId, userId);
        if (!user) {
            console.error("User not found");
            return;
        }
        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Room not found");
            return;
        }
        // const message = {
        //     type : OutgoingMessage.type,
        //     payload : {
        //         roomId,
        //         message,
        //         name : user.name,
        //         upvotes : number
        //     }
        // }
        room.users.forEach(({ conn }) => {
            console.log("outgoing message", JSON.stringify(message));
            conn.sendUTF(JSON.stringify(message))
        })


    }
}
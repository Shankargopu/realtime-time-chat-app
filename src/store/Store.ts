
export type UserId = string;

export interface Chat {
    chatId: string,
    name: string,
    userId: UserId,
    message: string,
    upvotes: UserId[]
}

export abstract class Store {
    constructor() {

    }

    initRoom(roomId: string) {

    }

    getChats(room: string, limit: number, offset: number) {

    }

    addChat(userId: UserId, room: string, message: string, name: string) {

    }
    upvote(userId: UserId, room: string, chatId: string) {

    }

}
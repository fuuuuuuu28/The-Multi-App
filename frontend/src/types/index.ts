export type UserType = {
    _id:string,
    clerkId:string,
    fullName:string,
    image:string,
    lastMessage:MessageType,
}

export type TodoType = {
    _id:string;
    task:string;
    completed:boolean;
}

export type MessageType = {
    _id:string,
    senderId:string,
    content:string,
    receiverId:string,
    createdAt:string,
    updatedAt:string,
}

export type SongType = {
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    audioUrl:string,
}
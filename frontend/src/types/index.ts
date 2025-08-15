export type UserType = {
    _id:string,
    clerkId:string,
    fullName:string,
    image:string,
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
}

export type SongType = {
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    audioUrl:string,
}
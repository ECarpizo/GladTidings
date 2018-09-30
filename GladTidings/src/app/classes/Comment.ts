import { User } from '../classes/User';

export interface Comment {
    _id: string,
    _v: number,
    title: String,
    postedBy: User,
    comment: String,
    replies: number[],
    created: Date
}
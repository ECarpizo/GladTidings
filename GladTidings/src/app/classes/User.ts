import { Comment } from './Comment';
import { Post } from './Post';

export interface User {
    _id: string;
    _v: number;
    firstName: string;
    lastName: string
    email: string;
    password: string;
    tier: string;
    active: boolean;
    created: Date;
    comments: number[];
    posts: number[];
}

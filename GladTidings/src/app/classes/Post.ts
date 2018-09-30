import { Category } from './Category';
import { Comment } from './Comment';
import { User } from './User';

export interface Post {
    _id: string,
    _v: number,
    title: string,
    subtitle: string,
    authors: User[],
    created,
    pictures: string[],
    content: string,
    comments: Comment[],
    categories: Category[],
    views: number,
    active: boolean
}



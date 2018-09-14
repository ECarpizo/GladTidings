import { Category } from './Cateogry';
import { Comment } from './Comment';

export interface Post {
    _id: string,
    _v: number,
    title: string,
    subtitle: string,
    author: string,
    created,
    pictures: string[],
    content: string,
    comments: Comment[],
    categories: Category[],
    views: number
}



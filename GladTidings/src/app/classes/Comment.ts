export interface Comment {
    _id: string,
    _v: number,
    postedBy,
    replies: Comment[],
    created: Date
}
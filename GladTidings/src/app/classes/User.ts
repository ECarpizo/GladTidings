export interface User {
    _id: string;
    firstName: string;
    lastName: string
    email: string;
    password: string;
    tier: string;
    active: boolean;
    created: Date;
}

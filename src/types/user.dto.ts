export interface User {
    id:number;
    username: string;
    password: string | null;
    email: string;
    gooleId: string;
    imageUrl: string;
    roleId: number;
}
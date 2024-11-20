export interface User {
    id:number;
    username: string;
    password: string | null;
    email: string;
    gooleId: string;
    imageUrl: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    rol: {
        type: string;
    }
}
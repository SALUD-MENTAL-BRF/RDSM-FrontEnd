export interface User {
  id: number;
  username: string;
  email: string;
  // googleId: string;
  // imageUrl: string;
  password: string;
  roleId: number;
}

export interface AuthContextProps {
  // user: User | null;
  // token: string | null;
  // isLogged: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  authState: any;
}

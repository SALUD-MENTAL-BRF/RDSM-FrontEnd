// src/types/auth.ts

export interface AuthState {
  token?: string;
  islogged: boolean;
  admin: boolean;
  user?: {
      admin: boolean;
  };
}

export interface AuthContextType {
  authState: AuthState;
  login: (payload: { token: { token: string }; user: { admin: boolean } }) => Promise<void>;
  logout: () => void;
}

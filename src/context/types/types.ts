// types/types.ts
export interface AuthState {
  isLogged: boolean;
  token: string | null;
  user: { id: number } | null;
}

export interface AuthContextProps {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}
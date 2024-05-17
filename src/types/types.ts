// src/types/types.ts
export const actiontypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
} as const;

export type Types = typeof actiontypes[keyof typeof actiontypes];

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.VITE_PORT) {
  throw new Error('La variable de entorno VITE_PORT es requerida.');
}

export const environments = {
  PORT: parseInt(process.env.VITE_PORT),
}
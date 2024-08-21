import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { environments } from './src/config/environments';

// Carga las variables de entorno desde el archivo .env

// Asegúrate de que la variable de entorno esté definida


export default defineConfig({
  plugins: [react()],
  server: {
    port: environments.PORT,
  },
});

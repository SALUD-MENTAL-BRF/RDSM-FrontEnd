/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_API_URL: string;
  // otras variables de entorno que tengas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

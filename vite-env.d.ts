/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: number
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
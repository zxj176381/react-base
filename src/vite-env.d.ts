/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_NAME: string;
  VITE_ENV_NAME: "development" | "staging" | "production";
  VITE_SERVICE_URL: string;
}

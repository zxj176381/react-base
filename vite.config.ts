import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const mate = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: "./",
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    server: {
      port: +mate.VITE_PORT,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: mate.VITE_DEV_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  };
});

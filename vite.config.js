import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], //отвечает за обработку кода TS, JSX
  server: {
    //настраивает dev-сервер
    proxy: {
      "/api": {
        //захватывает все пути , начинающиеся с api
        target: "http://localhost:3001", // перенаправляет на этот адрес
        changeOrigin: true, // без этой настройки может отвергнуть запрос из-за CORS
        rewrite: (path) => path.replace(/^\/api/, ""), //удаляет api из url перед отправкой
      },
    },
  },
});

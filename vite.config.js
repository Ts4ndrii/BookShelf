import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                history: resolve(__dirname, "history.html"),
                author: resolve(__dirname, "author.html"),
                myLibrary: resolve(__dirname, "my-library.html")
            }
        }
    }
});
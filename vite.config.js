import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/headhesive.js",
            name: "Headhesive",
            fileName: "headhesive",
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom", "antd"],
    },
    build: {
        sourcemap: true,
        outDir: "dist",
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "antd"],
                },
            },
        },
    },
});

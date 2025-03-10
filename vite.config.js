import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        feed: resolve(__dirname, "./post/feed/index.html"),
        profileUpdate: resolve(__dirname, "./profile/update/index.html"),
      },
    },
  },
});

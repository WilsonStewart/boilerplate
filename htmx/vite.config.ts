export default {
  root: "public/",
  server: {
    proxy: {
      "/tools": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        bypass: false, // Don't bypass the proxy
      },
      "/bob": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
    // Prevent Vite from serving these as static files
    fs: {
      strict: false,
    },
  },
};

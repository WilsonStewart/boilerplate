import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { streamSSE } from "hono/streaming";
import { HMainContainer } from "./h-main-container";

const app = new Hono();

app.get("/hot-reload", (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      await stream.writeSSE({ data: "ping" });
      await stream.sleep(5000);
    }
  });
});

app.get("/test", async (c) => {
  return c.html(`<h1>${crypto.randomUUID()}</h1>`);
});

app.use("/", async (c) => {
  if (c.req.header("HX-Request") === "true") {
    return HMainContainer(c);
  } else {
    return c.html(await Bun.file("./public/index.html").text());
  }
});

app.get("/styles.css", async (c) => {
  return c.text(await Bun.file("./public/styles.css").text(), 200, {
    "Content-Type": "text/css",
  });
});

app.use("/*", serveStatic({ root: "./public" }));

// Bun.serve({
//   fetch: app.fetch,
//   port: 3000,

//   // Disable timeout so SSE connections can live indefinitely
//   idleTimeout: 0,
// });

// console.log("Server running on http://localhost:3000");

export default app;

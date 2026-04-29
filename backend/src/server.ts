import "dotenv/config";
import { createServer } from "http";
import { createApp } from "./app.js";
import { initSocket } from "./lib/socket.js";

const app = createApp();
const server = createServer(app);
const port = Number(process.env.PORT || 4000);

// Initialize Socket.io
initSocket(server);

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});


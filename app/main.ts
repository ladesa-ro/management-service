import { Server } from "@/server/server.ts";

const start = () => {
  const server = new Server();
  server.start();
};

start();

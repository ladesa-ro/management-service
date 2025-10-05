import { Server } from "@/server/server.ts";

export const start = () => {
  const server = new Server();
  server.start();
}
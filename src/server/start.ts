import { installOutgoingRequestLogger } from "@/infrastructure.logging";
import { setupServer } from "@/server/setup-server";

installOutgoingRequestLogger();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

setupServer();

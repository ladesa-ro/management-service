import express from "express";

export class Server {
  start() {
    const app = express();
    app.listen(3701);
  }
}

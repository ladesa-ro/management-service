import express from "express";

export class Server {
  start() {
    const app = express();
    app.listen(3701, () => {
      console.log("escutando na porta 3701");
    });
  }
}

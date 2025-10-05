import express from "express"

class Server {
  start() {
    const app = express();
    app.listen(3701);
  }
}

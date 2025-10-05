import express from "express";
import { Container } from "inversify";
import { BaseApplicationError, ROUTE_REGISTRAR, type RouteRegistrar } from "@/shared";

export class Server {
  constructor(private readonly container: Container) {}

  start() {
    const app = express();

    app.use((req, _res, next) => {
      const requestContainer = new Container({ parent: this.container });
      requestContainer.bind("HttpRequest").toConstantValue(req);
      req.container = requestContainer;
      next();
    });

    const registrars = this.container.getAll<RouteRegistrar>(ROUTE_REGISTRAR);

    for (const registrar of registrars) {
      registrar.register(app);
    }

    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      if (err instanceof BaseApplicationError) {
        res.status(500).json(err);
      }

      console.error(err); // log do erro
      res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });

    app.listen(3701, () => {
      console.log("escutando na porta 3701");
    });
  }
}

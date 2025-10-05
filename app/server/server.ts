import express from "express";
import type { Container } from "inversify";
import { ApplicationErrorCode, BaseApplicationError, ROUTE_REGISTRAR, type RouteRegistrar } from "@/shared";

export class Server {
  constructor(private readonly container: Container) {}

  start() {
    const app = express();

    app.use((req, _res, next) => {
      req.container = this.container;
      next();
    });

    const registrars = this.container.getAll<RouteRegistrar>(ROUTE_REGISTRAR);

    for (const registrar of registrars) {
      registrar.register(app);
    }

    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      if (err instanceof BaseApplicationError) {
        let status = 400;

        switch (err.applicationCode) {
          case ApplicationErrorCode.FORBIDDEN: {
            status = 401;
            break;
          }

          case ApplicationErrorCode.NOT_FOUND: {
            status = 404;
            break;
          }

          case ApplicationErrorCode.VALIDATION_FAILED: {
            status = 429;
            break;
          }
        }

        res.status(status).json(err);
        return;
      }

      console.error(err);
      res.status(err.status || 500).json({
        primitive: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });

    app.listen(3701, () => {
      console.log("escutando na porta 3701");
    });
  }
}

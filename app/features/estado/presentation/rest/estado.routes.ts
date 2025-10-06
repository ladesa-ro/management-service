import { Router } from "express";
import { EstadoFindOneByIdRoute, EstadoListRoute } from "@/features";
import { createRouteHandler, Injectable, type RouteRegistrar, type RouteRegistrarApp } from "@/shared";

@Injectable("Singleton")
export class EstadoHttpRegistrar implements RouteRegistrar {
  register(app: RouteRegistrarApp) {
    const router = Router();

    router.get("/", createRouteHandler(EstadoListRoute));
    router.get("/:id", createRouteHandler(EstadoFindOneByIdRoute));

    app.use("/base/estados", router);
  }
}

import { Router } from "express";
import { EstadoFindOneByIdRoute, EstadoListRoute } from "@/features";
import { createRouteHandler, Inject, Injectable, type RouteRegistrar, type RouteRegistrarApp, SchemaRegistry } from "@/shared";

@Injectable("Singleton")
export class EstadoHttpRegistrar implements RouteRegistrar {
  constructor(
    @Inject(SchemaRegistry)
    private schemaRegistry: SchemaRegistry,
  ) {}
  register(app: RouteRegistrarApp) {
    const router = Router();

    router.get("/", createRouteHandler(this.schemaRegistry, EstadoListRoute));
    router.get("/:id", createRouteHandler(this.schemaRegistry, EstadoFindOneByIdRoute));

    app.use("/base/estados", router);
  }
}

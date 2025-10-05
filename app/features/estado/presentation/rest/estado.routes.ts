import { Router } from "express";
import { EstadoFindOneByIdRoute, EstadoListRoute } from "@/features";
import { getRequestRepresentationDto, Injectable, type RouteRegistrar, type RouteRegistrarApp } from "@/shared";

@Injectable("Singleton")
export class EstadoHttpRegistrar implements RouteRegistrar {
  register(app: RouteRegistrarApp) {
    const router = Router();

    router.get("/", (request) => {
      const list = request.container.get(EstadoListRoute, { autobind: true });
      const requestRepresentation = getRequestRepresentationDto(request);
      return list.handler(requestRepresentation);
    });

    router.get("/:id", (request) => {
      const list = request.container.get(EstadoFindOneByIdRoute, { autobind: true });
      const requestRepresentation = getRequestRepresentationDto(request);
      return list.handler(requestRepresentation);
    });

    app.use("/base/estados", router);
  }
}

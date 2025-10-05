import { Router } from "express";
import { EstadoFindOneByIdRoute, EstadoListRoute } from "@/features";
import { getRequestRepresentationDto } from "@/shared";

export class EstadoController {
  constructor(private estadoApplicationService: EstadoApplicationService) {}

  createRouter() {
    const router = Router();

    router.get("/base/estados", (request) => {
      const list = new EstadoListRoute(this.estadoApplicationService);
      const requestRepresentation = getRequestRepresentationDto(request);
      return list.handler(requestRepresentation);
    });

    router.get("/base/estados/:id", (request) => {
      const list = new EstadoFindOneByIdRoute(this.estadoApplicationService);
      const requestRepresentation = getRequestRepresentationDto(request);
      return list.handler(requestRepresentation);
    });

    return router;
  }
}

import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, IDomain, requestRepresentationMergeToDomain } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { EstadoService } from "../domain/estado.service";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoList") dto: IAppRequest<"EstadoList">) {
    const domain: IDomain.EstadoListInput = requestRepresentationMergeToDomain(dto);
    return this.estadoService.findAll(accessContext, domain);
  }

  @Get("/:id")
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoFindOneById") dto: IAppRequest<"EstadoFindOneById">) {
    const domain: IDomain.EstadoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.estadoService.findByIdStrict(accessContext, domain);
  }
}

import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { EstadoService } from "../domain/estado.service";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoList") dto: IAppRequest<"EstadoList">) {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EstadoFindOneById") dto: IAppRequest<"EstadoFindOneById">) {
    return this.estadoService.findByIdStrict(accessContext, dto);
  }
}

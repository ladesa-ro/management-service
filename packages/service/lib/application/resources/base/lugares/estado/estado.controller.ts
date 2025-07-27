import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EstadoService } from "./estado.service";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  async findAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("FindAll") dto: IAppRequest<"FindAll">): Promise<LadesaTypings.EstadoListOperationOutput["success"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  async findById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("FindById") dto: IAppRequest<"FindById">) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

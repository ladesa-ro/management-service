import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DisponibilidadeDiaController {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  @Get("/")
  async disponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,

    @AppRequest("DisponibilidadeDiaFindAll") dto: IAppRequest<"DisponibilidadeDiaFindAll">,
  ): Promise<LadesaTypings.DisponibilidadeDiaListOperationOutput["success"]> {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(clientAccess, dto);
  }

  @Get("/:id")
  async disponibilidadeDiaFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaFindById") dto: IAppRequest<"DisponibilidadeDiaFindById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  @Post("/")
  async disponibilidadeDiaCreate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaCreate") dto: IAppRequest<"DisponibilidadeDiaCreate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async disponibilidadeDiaUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaUpdate") dto: IAppRequest<"DisponibilidadeDiaUpdate">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async disponibilidadeDiaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaDeleteOneById") dto: IAppRequest<"DisponibilidadeDiaDeleteOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @AppRequest("HorarioGeradoAulaFindAll") dto: IAppRequest<"HorarioGeradoAulaFindAll">,
  ): Promise<LadesaTypings.HorarioGeradoAulaListOperationOutput["success"]> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async horarioGeradoAulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("HorarioGeradoAulaFindById") dto: IAppRequest<"HorarioGeradoAulaFindById">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async horarioGeradoAulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("HorarioGeradoAulaCreate") dto: IAppRequest<"HorarioGeradoAulaCreate">,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async HorarioGeradoAulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("HorarioGeradoAulaUpdate") dto: IAppRequest<"HorarioGeradoAulaUpdate">,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async HorarioGeradoAulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("HorarioGeradoAulaDeleteOneById") dto: IAppRequest<"HorarioGeradoAulaDeleteOneById">,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaFindAll") dto: IApiDoc.operations["HorarioGeradoAulaFindAll"],
  ): Promise<LadesaTypings.HorarioGeradoAulaListOperationOutput["success"]> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async horarioGeradoAulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaFindById") dto: IApiDoc.operations["HorarioGeradoAulaFindById"],
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async horarioGeradoAulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoAulaCreate") dto: IApiDoc.operations["HorarioGeradoAulaCreate"],
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async HorarioGeradoAulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("HorarioGeradoAulaUpdate") dto: IApiDoc.operations["HorarioGeradoAulaUpdate"],
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async HorarioGeradoAulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("HorarioGeradoAulaDeleteOneById") dto: IApiDoc.operations["HorarioGeradoAulaDeleteOneById"],
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}

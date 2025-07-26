import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoService } from "./horario-gerado.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  async horarioGeradoFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("HorarioGeradoFindAll") dto: IOperationInput<"HorarioGeradoFindAll">,
  ): Promise<LadesaTypings.HorarioGeradoListOperationOutput["success"]> {
    return this.horarioGeradoService.horarioGeradoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async horarioGeradoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoFindById") dto: IOperationInput<"HorarioGeradoFindById">,
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async horarioGeradoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoCreate") dto: IOperationInput<"HorarioGeradoCreate">,
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async horarioGeradoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoUpdate") dto: IOperationInput<"HorarioGeradoUpdate">,
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async horarioGeradoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoDeleteOneById") dto: IOperationInput<"HorarioGeradoDeleteOneById">,
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

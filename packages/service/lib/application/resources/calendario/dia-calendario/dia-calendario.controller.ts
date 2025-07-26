import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiaCalendarioService } from "./dia-calendario.service";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  async diaCalendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("DiaCalendarioFindAll") dto: IApiDoc.operations["DiaCalendarioFindAll"],
  ): Promise<LadesaTypings.DiaCalendarioListOperationOutput["success"]> {
    return this.diaCalendarioService.diaCalendarioFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async diaCalendarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioFindById") dto: IApiDoc.operations["DiaCalendarioFindById"],
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async diaCalendarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioCreate") dto: IApiDoc.operations["DiaCalendarioCreate"],
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diaCalendarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioUpdate") dto: IApiDoc.operations["DiaCalendarioUpdate"],
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diaCalendarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioDeleteOneById") dto: IApiDoc.operations["DiaCalendarioDeleteOneById"],
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("CalendarioFindAll") dto: IApiDoc.operations["CalendarioFindAll"],
  ): Promise<LadesaTypings.CalendarioLetivoListOperationOutput["success"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("CalendarioLetivoFindById") dto: IApiDoc.operations["CalendarioLetivoFindById"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusCreate") dto: IApiDoc.operations["CampusCreate"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoUpdate") dto: IApiDoc.operations["CalendarioLetivoUpdate"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoDeleteOneById") dto: IApiDoc.operations["CalendarioLetivoDeleteOneById"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}

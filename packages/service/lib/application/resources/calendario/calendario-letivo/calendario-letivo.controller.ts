import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  async calendarioFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @HttpOperationInput("CalendarioFindAll") dto: IOperationInput<"CalendarioFindAll">,
  ): Promise<LadesaTypings.CalendarioLetivoListOperationOutput["success"]> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async calendarioLetivoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("CalendarioLetivoFindById") dto: IOperationInput<"CalendarioLetivoFindById">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async campusCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CampusCreate") dto: IOperationInput<"CampusCreate">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async calendarioLetivoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoUpdate") dto: IOperationInput<"CalendarioLetivoUpdate">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async CalendarioLetivoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoDeleteOneById") dto: IOperationInput<"CalendarioLetivoDeleteOneById">,
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}

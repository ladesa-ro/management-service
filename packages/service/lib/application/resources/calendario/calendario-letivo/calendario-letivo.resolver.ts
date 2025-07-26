import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CalendarioLetivoService } from "./calendario-letivo.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class CalendarioLetivoResolver {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  //
  
  async calendarioLetivoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoFindAll") dto: IApiDoc.operations["CalendarioLetivoFindAll"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, dto);
  }

  //
  
  async calendarioLetivoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("CalendarioLetivoFindOneById") dto: IApiDoc.operations["CalendarioLetivoFindOneById"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //
  
  async calendarioLetivoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoCreate") dto: IApiDoc.operations["CalendarioLetivoCreate"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  //
  
  async calendarioLetivoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoUpdate") dto: IApiDoc.operations["CalendarioLetivoUpdate"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, dto);
  }

  //
  
  async calendarioLetivoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CalendarioLetivoDeleteOneById") dto: IApiDoc.operations["CalendarioLetivoDeleteOneById"],
  ) {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}

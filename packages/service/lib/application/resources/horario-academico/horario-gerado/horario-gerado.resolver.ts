import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { HorarioGeradoService } from "./horario-gerado.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class HorarioGeradoResolver {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  //
  
  async horarioGeradoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoFindAll") dto: IApiDoc.operations["HorarioGeradoFindAll"],
  ) {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }

  //
  
  async horarioGeradoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoFindOneById") dto: IApiDoc.operations["HorarioGeradoFindOneById"],
  ) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //
  
  async horarioGeradoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoCreate") dto: IApiDoc.operations["HorarioGeradoCreate"],
  ) {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  //
  
  async horarioGeradoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoUpdate") dto: IApiDoc.operations["HorarioGeradoUpdate"],
  ) {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, dto);
  }

  //
  
  async horarioGeradoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("HorarioGeradoDeleteOneById") dto: IApiDoc.operations["HorarioGeradoDeleteOneById"],
  ) {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

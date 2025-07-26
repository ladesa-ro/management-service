import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ReservaService } from "./reserva.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class ReservaResolver {
  constructor(
    //
    private reservaService: ReservaService,
  ) {}

  //
  
  async reservaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ReservaFindAll") dto: IApiDoc.operations["ReservaFindAll"],
  ) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  //
  
  async reservaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ReservaFindOneById") dto: IApiDoc.operations["ReservaFindOneById"],
  ) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async reservaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ReservaCreate") dto: IApiDoc.operations["ReservaCreate"],
  ) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  
  async reservaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ReservaUpdate") dto: IApiDoc.operations["ReservaUpdate"],
  ) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  
  async reservaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("ReservaDeleteOneById") dto: IApiDoc.operations["ReservaDeleteOneById"],
  ) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

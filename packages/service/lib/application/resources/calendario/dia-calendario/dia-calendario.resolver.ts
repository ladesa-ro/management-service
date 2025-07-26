import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiaCalendarioService } from "./dia-calendario.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class DiaCalendarioResolver {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  //
  
  async diaCalendarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioFindAll") dto: IOperationInput<"DiaCalendarioFindAll">,
  ) {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }

  //
  
  async diaCalendarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioFindOneById") dto: IOperationInput<"DiaCalendarioFindOneById">,
  ) {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //
  
  async diaCalendarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioCreate") dto: IOperationInput<"DiaCalendarioCreate">,
  ) {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  //
  
  async diaCalendarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioUpdate") dto: IOperationInput<"DiaCalendarioUpdate">,
  ) {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, dto);
  }

  //
  
  async diaCalendarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiaCalendarioDeleteOneById") dto: IOperationInput<"DiaCalendarioDeleteOneById">,
  ) {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

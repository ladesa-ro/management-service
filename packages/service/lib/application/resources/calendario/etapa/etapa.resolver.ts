import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}

  //
  
  async etapaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaFindAll") dto: IOperationInput<"EtapaFindAll">,
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }

  //
  
  async etapaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaFindOneById") dto: IOperationInput<"EtapaFindOneById">,
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async etapaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaCreate") dto: IOperationInput<"EtapaCreate">,
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //
  
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaUpdate") dto: IOperationInput<"EtapaUpdate">,
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //
  
  async etapaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaDeleteOneById") dto: IOperationInput<"EtapaDeleteOneById">,
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

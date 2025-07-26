import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}

  //
  
  async etapaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaFindAll") dto: IApiDoc.operations["EtapaFindAll"],
  ) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }

  //
  
  async etapaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaFindOneById") dto: IApiDoc.operations["EtapaFindOneById"],
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async etapaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaCreate") dto: IApiDoc.operations["EtapaCreate"],
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //
  
  async etapaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaUpdate") dto: IApiDoc.operations["EtapaUpdate"],
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //
  
  async etapaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("EtapaDeleteOneById") dto: IApiDoc.operations["EtapaDeleteOneById"],
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

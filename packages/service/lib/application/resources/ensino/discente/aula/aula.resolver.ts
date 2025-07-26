import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";

@Resolver()
export class AulaResolver {
  constructor(
    //
    private aulaService: AulaService,
  ) {}

  //
  
  async aulaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaFindAll") dto: IApiDoc.operations["AulaFindAll"],
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //
  
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaFindOneById") dto: IApiDoc.operations["AulaFindOneById"],
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async aulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaCreate") dto: IApiDoc.operations["AulaCreate"],
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaUpdate") dto: IApiDoc.operations["AulaUpdate"],
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaDeleteOneById") dto: IApiDoc.operations["AulaDeleteOneById"],
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

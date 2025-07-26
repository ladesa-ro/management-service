import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

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
    @HttpOperationInput("AulaFindAll") dto: IOperationInput<"AulaFindAll">,
  ) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //
  
  async aulaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaFindOneById") dto: IOperationInput<"AulaFindOneById">,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async aulaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaCreate") dto: IOperationInput<"AulaCreate">,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  
  async aulaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaUpdate") dto: IOperationInput<"AulaUpdate">,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  
  async aulaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AulaDeleteOneById") dto: IOperationInput<"AulaDeleteOneById">,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

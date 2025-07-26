import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { BlocoService } from "./bloco.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class BlocoResolver {
  constructor(
    //
    private blocoService: BlocoService,
  ) {}

  //

  
  async blocoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoFindAll") dto: IApiDoc.operations["BlocoFindAll"],
  ) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  //
  
  async blocoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoFindOneById") dto: IApiDoc.operations["BlocoFindOneById"],
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async blocoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoCreate") dto: IApiDoc.operations["BlocoCreate"],
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  
  async blocoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoUpdate") dto: IApiDoc.operations["BlocoUpdate"],
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }

  
  async blocoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("BlocoDeleteOneById") dto: IApiDoc.operations["BlocoDeleteOneById"],
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

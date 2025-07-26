import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioService } from "./diario.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class DiarioResolver {
  constructor(
    //
    private diarioService: DiarioService,
  ) {}

  //
  
  async diarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioFindAll") dto: IApiDoc.operations["DiarioFindAll"],
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //
  
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioFindOneById") dto: IApiDoc.operations["DiarioFindOneById"],
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioCreate") dto: IApiDoc.operations["DiarioCreate"],
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioUpdate") dto: IApiDoc.operations["DiarioUpdate"],
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioDeleteOneById") dto: IApiDoc.operations["DiarioDeleteOneById"],
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

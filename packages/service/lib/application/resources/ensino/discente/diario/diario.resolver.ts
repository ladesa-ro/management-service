import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioService } from "./diario.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("DiarioFindAll") dto: IOperationInput<"DiarioFindAll">,
  ) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //
  
  async diarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioFindOneById") dto: IOperationInput<"DiarioFindOneById">,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async diarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioCreate") dto: IOperationInput<"DiarioCreate">,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  
  async diarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioUpdate") dto: IOperationInput<"DiarioUpdate">,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  
  async diarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioDeleteOneById") dto: IOperationInput<"DiarioDeleteOneById">,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

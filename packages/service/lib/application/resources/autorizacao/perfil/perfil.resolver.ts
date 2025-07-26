import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver as GqlResolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { PerfilService } from "./perfil.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@GqlResolver()
export class PerfilResolver {
  constructor(
    //
    private perfilService: PerfilService,
  ) {}

  //

  
  async vinculoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("VinculoFindAll") dto: IOperationInput<"VinculoFindAll">,
  ) {
    return this.perfilService.perfilFindAll(accessContext, dto);
  }

  
  async vinculoSetVinculos(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("VinculoSetVinculos") dto: IOperationInput<"VinculoSetVinculos">,
  ) {
    return this.perfilService.perfilSetVinculos(accessContext, dto);
  }
}

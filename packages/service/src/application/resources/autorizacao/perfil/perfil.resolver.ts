import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver as GqlResolver } from "@nestjs/graphql";
import { PerfilService } from "./perfil.service";

@GqlResolver()
export class PerfilResolver {
  constructor(
    //
    private perfilService: PerfilService,
  ) {}

  //

  @Operation(Tokens.PerfilList)
  async vinculoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.PerfilListOperationInput,
  ) {
    return this.perfilService.perfilFindAll(accessContext, dto);
  }

  @Operation(Tokens.PerfilUpdateOneById)
  async vinculoSetVinculos(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.PerfilUpdateOperationInput,
  ) {
    return this.perfilService.perfilSetVinculos(accessContext, dto);
  }
}

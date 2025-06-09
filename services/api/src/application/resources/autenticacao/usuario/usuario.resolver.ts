import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { UsuarioService } from "./usuario.service";

@Resolver()
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}
  //
  @Operation(Tokens.UsuarioList)
  async usuarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioListOperationInput,
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }
  //
  @Operation(Tokens.UsuarioFindOneById)
  async usuarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindOneByIdOperationOutput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.UsuarioCreate)
  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateOperationInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }
  @Operation(Tokens.UsuarioUpdateOneById)
  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIdOperationInput,
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }
  @Operation(Tokens.UsuarioDeleteOneById)
  async usuarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIdOperationInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

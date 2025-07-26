import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";

@Resolver()
export class UsuarioResolver {
  constructor(
    //
    private usuarioService: UsuarioService,
  ) {}

  //

  async usuarioFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioFindAll") dto: IOperationInput<"UsuarioFindAll">,
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  async usuarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioFindOneById") dto: IOperationInput<"UsuarioFindOneById">,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioCreate") dto: IOperationInput<"UsuarioCreate">,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioUpdate") dto: IOperationInput<"UsuarioUpdate">,
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  async usuarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioDeleteOneById") dto: IOperationInput<"UsuarioDeleteOneById">,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

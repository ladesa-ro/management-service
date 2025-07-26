import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

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
    @HttpOperationInput("UsuarioFindAll") dto: IApiDoc.operations["UsuarioFindAll"],
  ) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //
  
  async usuarioFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioFindOneById") dto: IApiDoc.operations["UsuarioFindOneById"],
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async usuarioCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioCreate") dto: IApiDoc.operations["UsuarioCreate"],
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  
  async usuarioUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioUpdate") dto: IApiDoc.operations["UsuarioUpdate"],
  ) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  
  async usuarioDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("UsuarioDeleteOneById") dto: IApiDoc.operations["UsuarioDeleteOneById"],
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

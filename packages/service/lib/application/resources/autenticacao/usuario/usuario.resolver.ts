import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";

@Resolver()
export class UsuarioResolver {
  constructor(private usuarioService: UsuarioService) {}

  async usuarioFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("UsuarioFindAll") dto: IAppRequest<"UsuarioFindAll">) {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  async usuarioFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("UsuarioFindOneById") dto: IAppRequest<"UsuarioFindOneById">) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, dto);
  }

  async usuarioCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("UsuarioCreate") dto: IAppRequest<"UsuarioCreate">) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  async usuarioUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("UsuarioUpdate") dto: IAppRequest<"UsuarioUpdateOneById">) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  async usuarioDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("UsuarioDeleteOneById") dto: IAppRequest<"UsuarioDeleteOneById">) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, dto);
  }
}

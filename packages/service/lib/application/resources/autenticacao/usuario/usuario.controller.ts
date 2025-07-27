import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get("/")
  async usuarioFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioFindAll") dto: IAppRequest<"UsuarioFindAll">,
  ): Promise<LadesaTypings.UsuarioListOperationOutput["success"]> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  @Get("/:id")
  async usuarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioFindById") dto: IAppRequest<"UsuarioFindById">) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async usuarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioCreate") dto: IAppRequest<"UsuarioCreate">) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  @Patch("/:id")
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioUpdate") dto: IAppRequest<"UsuarioUpdate">) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async usuarioGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioGetImagemCapa") dto: IAppRequest<"UsuarioGetImagemCapa">) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.parameters.path.id);
  }

  @Put("/:id/imagem/capa")
  async usuarioImagemCapaSave(@AccessContextHttp() accessContext: AccessContext, @UploadedFile() file: Express.Multer.File) {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, { id }, file);
  }

  @Get("/:id/imagem/perfil")
  async usuarioGetImagemPerfil(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioGetImagemPerfil") dto: IAppRequest<"UsuarioGetImagemPerfil">) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.parameters.path.id);
  }

  @Put("/:id/imagem/perfil")
  async usuarioImagemPerfilSave(@AccessContextHttp() accessContext: AccessContext, @UploadedFile() file: Express.Multer.File) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, { id }, file);
  }

  @Delete("/:id")
  async usuarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioDeleteOneById") dto: IAppRequest<"UsuarioDeleteOneById">) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

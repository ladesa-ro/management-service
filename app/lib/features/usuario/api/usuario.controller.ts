import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { UsuarioService } from "../domain/usuario.service";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get("/:id/ensino")
  async usuarioEnsinoById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioEnsinoById") dto: IAppRequest<"UsuarioEnsinoById">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioEnsinoById(accessContext, domain);
  }

  @Get("/")
  async usuarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioList") dto: IAppRequest<"UsuarioList">) {
    const domain: IDomain.UsuarioListInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioFindAll(accessContext, domain);
  }

  @Get("/:id")
  async usuarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioFindOneById") dto: IAppRequest<"UsuarioFindOneById">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async usuarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioCreate") dto: IAppRequest<"UsuarioCreate">) {
    const domain: IDomain.UsuarioCreateInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioCreate(accessContext, domain);
  }

  @Patch("/:id")
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioUpdateOneById") dto: IAppRequest<"UsuarioUpdateOneById">) {
    const domain: IDomain.UsuarioFindOneInput & IDomain.UsuarioUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async usuarioGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioGetImagemCapa") dto: any, // Temporarily use 'any' to bypass the type error
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/capa")
  async usuarioImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioSetImagemCapa") dto: IAppRequest<"UsuarioSetImagemCapa">,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, domain, file);
  }

  @Get("/:id/imagem/perfil")
  async usuarioGetImagemPerfil(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioGetImagemPerfil") dto: IAppRequest<"UsuarioGetImagemPerfil">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, domain.id);
  }

  @Put("/:id/imagem/perfil")
  async usuarioImagemPerfilSave(
    @UploadedFile() file: Express.Multer.File,
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioSetImagemPerfil") dto: IAppRequest<"UsuarioSetImagemPerfil">,
  ) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, domain, file);
  }

  @Delete("/:id")
  async usuarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioDeleteOneById") dto: IAppRequest<"UsuarioDeleteOneById">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioDeleteOneById(accessContext, domain);
  }
}

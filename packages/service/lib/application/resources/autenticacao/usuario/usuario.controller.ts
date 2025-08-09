import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";

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
  async usuarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioFindById") dto: IAppRequest<"UsuarioFindOneById">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async usuarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioCreate") dto: IAppRequest<"UsuarioCreate">) {
    const domain: IDomain.UsuarioCreateInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioCreate(accessContext, domain);
  }

  @Patch("/:id")
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioUpdate") dto: IAppRequest<"UsuarioUpdateOneById">) {
    const domain: IDomain.UsuarioUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async usuarioGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioGetImagemCapa") dto: any, // Temporarily use 'any' to bypass the type error
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.path.id);
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
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.path.id);
  }

  @Put("/:id/imagem/perfil")
  async usuarioImagemPerfilSave(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("UsuarioSetImagemPerfil") dto: IAppRequest<"UsuarioSetImagemPerfil">,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, dto, file);
  }

  @Delete("/:id")
  async usuarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("UsuarioDeleteOneById") dto: IAppRequest<"UsuarioDeleteOneById">) {
    const domain: IDomain.UsuarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.usuarioService.usuarioDeleteOneById(accessContext, domain);
  }
}

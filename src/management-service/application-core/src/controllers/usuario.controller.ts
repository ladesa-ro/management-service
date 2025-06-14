
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { UsuarioService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RotaInputs } from "../helpers/rota-inputs";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios"].get)
  async usuarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios"]["get"],
  ): Promise<IDomainContracts.UsuarioListOperationOutput["success"]> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios/{id}"].get)
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios/{id}"]["get"],
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios"].post)
  async usuarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios"]["post"],
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios/{id}"].patch)
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios/{id}"]["patch"]) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios/{id}/imagem/capa"].get)
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios/{id}"]["get"],
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios/{id}/imagem/capa"].put)
  async usuarioImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Get("/:id/imagem/perfil")
  @Operation(Tokens.UsuarioGetImagemPerfil)
  async usuarioGetImagemPerfil(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios/{id}"]["get"],
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/perfil")
  @Operation(Tokens.UsuarioSetImagemPerfil)
  async usuarioImagemPerfilSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Usuarios/{id}"].delete)
  async usuarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Usuarios/{id}"]["delete"],
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

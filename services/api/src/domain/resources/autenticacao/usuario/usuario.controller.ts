import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { UsuarioService } from "./usuario.service";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get("/")
  @Operation(Tokens.UsuarioList)
  async usuarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.UsuarioListOperationInput,
  ): Promise<IDomainContracts.UsuarioListOperationOutput["success"]> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.UsuarioFindOneById)
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.UsuarioFindOneByIdOperationOutput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.UsuarioCreate)
  async usuarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.UsuarioCreateOperationInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.UsuarioUpdateOneById)
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: IDomainContracts.UsuarioUpdateByIdOperationInput) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.UsuarioGetImagemCapa)
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.UsuarioFindOneByIdOperationOutput,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.params.id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.UsuarioSetImagemCapa)
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
    @CombinedInput() dto: IDomainContracts.UsuarioFindOneByIdOperationOutput,
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
  @Operation(Tokens.UsuarioDeleteOneById)
  async usuarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.UsuarioDeleteByIdOperationInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { UsuarioService } from "./usuario.service";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get("/")
  async usuarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioFindAll") dto: IOperationInput<"UsuarioFindAll">,
  ): Promise<LadesaTypings.UsuarioListOperationOutput["success"]> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioFindById") dto: IOperationInput<"UsuarioFindById">,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async usuarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioCreate") dto: IOperationInput<"UsuarioCreate">,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("UsuarioUpdate") dto: IOperationInput<"UsuarioUpdate">) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioGetImagemCapa") dto: IOperationInput<"UsuarioGetImagemCapa">,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.parameters.path.id);
  }

  @Put("/:id/imagem/capa")
  async usuarioImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Get("/:id/imagem/perfil")
  async usuarioGetImagemPerfil(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioGetImagemPerfil") dto: IOperationInput<"UsuarioGetImagemPerfil">,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.parameters.path.id);
  }

  @Put("/:id/imagem/perfil")
  async usuarioImagemPerfilSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async usuarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("UsuarioDeleteOneById") dto: IOperationInput<"UsuarioDeleteOneById">,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

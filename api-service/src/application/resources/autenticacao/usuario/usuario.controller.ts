import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./usuario.service";

@Controller("/usuarios")
@ApiTags("usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get("/:idUsuario/ensino")
  @Operation(Tokens.UsuarioEnsinoFindById)
  async getEnsino(
    @AccessContextHttp() accessContext: AccessContext, //talvez erro... <====
    @Param("idUsuario", ParseUUIDPipe) idUsuario: string,
  ): Promise<any> {
    const perfis = await this.usuarioService.getPerfilEnsino(accessContext, idUsuario);

    const groupedDiario: Record<string, Record<string, { curso: any; turmas: any[] }>> = {};

    perfis.forEach((perfil) => {
      perfil.diarios.forEach((diario) => {
        if (!diario.disciplina || !diario.turma || !diario.turma.curso) return;
        const discName = diario.disciplina.nome;
        const cursoId = diario.turma.curso.id;
        if (!groupedDiario[discName]) {
          groupedDiario[discName] = {};
        }
        if (!groupedDiario[discName][cursoId]) {
          groupedDiario[discName][cursoId] = { curso: diario.turma.curso, turmas: [] };
        }
        if (!groupedDiario[discName][cursoId].turmas.find((t) => t.id === diario.turma.id)) {
          groupedDiario[discName][cursoId].turmas.push(diario.turma);
        }
      });
    });

    const result = Object.keys(groupedDiario).map((disciplinaNome) => ({
      disciplina: { nome: disciplinaNome },
      cursos: Object.values(groupedDiario[disciplinaNome]),
    }));

    return result;
  }
  //

  @Get("/:id")
  @Operation(Tokens.UsuarioFindOneById)
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindOneByIdOperationOutput,
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
    @CombinedInput() dto: LadesaTypings.UsuarioCreateOperationInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.UsuarioUpdateOneById)
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIdOperationInput) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.UsuarioGetImagemCapa)
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindOneByIdOperationOutput,
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
    @CombinedInput() dto: LadesaTypings.UsuarioFindOneByIdOperationOutput,
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
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIdOperationInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CursoService } from "./curso.service";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get("/")
  @Operation(Tokens.CursoList)
  async cursoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoListOperationInput,
  ): Promise<LadesaTypings.CursoListOperationOutput["success"]> {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.CursoFindOneById)
  async cursoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindOneByIdOperationOutput,
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.CursoCreate)
  async cursoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoCreateOperationInput,
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.CursoUpdateOneById)
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.CursoUpdateByIdOperationInput) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.CursoGetImagemCapa)
  async cursoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.CursoSetImagemCapa)
  async cursoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.cursoService.cursoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.CursoDeleteOneById)
  async cursoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CursoFindOneByIdOperationOutput,
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

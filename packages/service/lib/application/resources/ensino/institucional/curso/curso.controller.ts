import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CursoService } from "./curso.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  //

  @Get("/")
  async cursoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CursoFindAll") dto: IApiDoc.operations["CursoFindAll"],
  ): Promise<LadesaTypings.CursoListOperationOutput["success"]> {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async cursoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CursoFindById") dto: IApiDoc.operations["CursoFindById"],
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async cursoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CursoCreate") dto: IApiDoc.operations["CursoCreate"],
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async cursoUpdate(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("CursoUpdate") dto: IApiDoc.operations["CursoUpdate"]) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async cursoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext
  ) {
    return this.cursoService.cursoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async cursoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.cursoService.cursoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async cursoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("CursoDeleteOneById") dto: IApiDoc.operations["CursoDeleteOneById"],
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

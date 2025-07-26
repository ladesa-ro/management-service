import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisciplinaService } from "./disciplina.service";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get("/")
  async disciplinaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindAll") dto: IApiDoc.operations["DisciplinaFindAll"],
  ): Promise<LadesaTypings.DisciplinaListOperationOutput["success"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async disciplinaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindById") dto: IApiDoc.operations["DisciplinaFindById"],
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async disciplinaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaCreate") dto: IApiDoc.operations["DisciplinaCreate"],
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaUpdate") dto: IApiDoc.operations["DisciplinaUpdate"],
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async disciplinaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async disciplinaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaDeleteOneById") dto: IApiDoc.operations["DisciplinaDeleteOneById"],
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

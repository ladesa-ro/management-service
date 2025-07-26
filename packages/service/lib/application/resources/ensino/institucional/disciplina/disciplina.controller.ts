import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("DisciplinaFindAll") dto: IOperationInput<"DisciplinaFindAll">,
  ): Promise<LadesaTypings.DisciplinaListOperationOutput["success"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async disciplinaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindById") dto: IOperationInput<"DisciplinaFindById">,
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
    @HttpOperationInput("DisciplinaCreate") dto: IOperationInput<"DisciplinaCreate">,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaUpdate") dto: IOperationInput<"DisciplinaUpdate">,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async disciplinaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async disciplinaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaDeleteOneById") dto: IOperationInput<"DisciplinaDeleteOneById">,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

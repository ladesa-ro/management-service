import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaService } from "./turma.service";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get("/")
  async turmaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaFindAll") dto: IApiDoc.operations["TurmaFindAll"],
  ): Promise<LadesaTypings.TurmaListOperationOutput["success"]> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async turmaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaFindById") dto: IApiDoc.operations["TurmaFindById"],
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async turmaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaCreate") dto: IApiDoc.operations["TurmaCreate"],
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async turmaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaUpdate") dto: IApiDoc.operations["TurmaUpdate"],
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async turmaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async turmaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async turmaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaDeleteOneById") dto: IApiDoc.operations["TurmaDeleteOneById"],
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

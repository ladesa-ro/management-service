import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TurmaService } from "./turma.service";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  //

  @Get("/")
  @Operation(Tokens.TurmaList)
  async turmaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaListOperationInput,
  ): Promise<LadesaTypings.TurmaListOperationOutput["success"]> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.TurmaFindOneById)
  async turmaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaFindOneByIdOperationOutput,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.TurmaCreate)
  async turmaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaCreateOperationInput,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.TurmaUpdateOneById)
  async turmaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaUpdateByIdOperationInput,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.TurmaGetImagemCapa)
  async turmaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.TurmaSetImagemCapa)
  async turmaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.TurmaDeleteOneById)
  async turmaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.TurmaDeleteByIdOperationInput,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

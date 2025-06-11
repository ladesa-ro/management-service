import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { DisciplinaService } from "./disciplina.service";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  //

  @Get("/")
  @Operation(Tokens.DisciplinaList)
  async disciplinaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.DisciplinaListOperationInput,
  ): Promise<IDomainContracts.DisciplinaListOperationOutput["success"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DisciplinaFindOneById)
  async disciplinaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.DisciplinaFindOneByIdOperationOutput,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.DisciplinaCreate)
  async disciplinaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.DisciplinaCreateOperationInput,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DisciplinaUpdateOneById)
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.DisciplinaUpdateByIdOperationInput,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.DisciplinaGetImagemCapa)
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.DisciplinaSetImagemCapa)
  async disciplinaImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DisciplinaDeleteOneById)
  async disciplinaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.DisciplinaDeleteByIdOperationInput,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

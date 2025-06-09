import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BlocoService } from "./bloco.service";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get("/")
  @Operation(Tokens.BlocoList)
  async blocoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoListOperationInput,
  ): Promise<LadesaTypings.BlocoListOperationOutput["success"]> {
    return this.blocoService.blocoFindAll(accessContext, combinedInput);
  }

  //

  @Get("/:id")
  @Operation(Tokens.BlocoFindOneById)
  async blocoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  //

  @Post("/")
  @Operation(Tokens.BlocoCreate)
  async blocoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoCreateOperationInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, combinedInput);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.BlocoUpdateOneById)
  async blocoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoUpdateByIdOperationInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, combinedInput);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.BlocoGetImagemCapa)
  async blocoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.BlocoSetImagemCapa)
  async blocoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.BlocoDeleteOneById)
  async blocoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() combinedInput: LadesaTypings.BlocoDeleteByIdOperationInput,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: combinedInput.params.id,
    });
  }

  //
}

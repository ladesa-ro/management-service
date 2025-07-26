import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { BlocoService } from "./bloco.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get("/")
  async blocoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("BlocoFindAll") dto: IOperationInput<"BlocoFindAll">,
  ): Promise<LadesaTypings.BlocoListOperationOutput["success"]> {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async blocoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  //

  @Post("/")
  async blocoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("BlocoCreate") dto: IOperationInput<"BlocoCreate">,
  ) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async blocoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("BlocoUpdate") dto: IOperationInput<"BlocoUpdate">,
  ) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  async blocoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async blocoImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.blocoService.blocoUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  async blocoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("BlocoDeleteOneById") dto: IOperationInput<"BlocoDeleteOneById">,
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

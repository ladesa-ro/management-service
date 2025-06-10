import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AmbienteService } from "./ambiente.service";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  @Operation(Tokens.AmbienteList)
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteListOperationInput,
  ): Promise<LadesaTypings.AmbienteListOperationOutput["success"]> {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.AmbienteFindOneById)
  async ambienteFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindOneByIdOperationOutput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  @Post("/")
  @Operation(Tokens.AmbienteCreate)
  async ambienteCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateOperationInput,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.AmbienteUpdateOneById)
  async ambienteUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIdOperationInput,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @Operation(Tokens.AmbienteGetImagemCapa)
  async ambienteGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @Operation(Tokens.AmbienteSetImagemCapa)
  async ambienteImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.AmbienteDeleteOneById)
  async ambienteDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteDeleteByIdOperationInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

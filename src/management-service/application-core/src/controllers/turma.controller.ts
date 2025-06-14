
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { TurmaService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas"].get)
  async turmaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Turmas"]["get"],
  ): Promise<IDomainContracts.TurmaListOperationOutput["success"]> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas/{id}"].get)
  async turmaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Turmas/{id}"]["get"],
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas"].post)
  async turmaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Turmas"]["post"],
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas/{id}"].patch)
  async turmaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Turmas/{id}"]["patch"],
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas/{id}/imagem/capa"].get)
  async turmaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas/{id}/imagem/capa"].put)
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
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Turmas/{id}"].delete)
  async turmaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/Turmas/{id}"]["delete"],
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

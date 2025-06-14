
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { DisciplinaService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas"].get)
  async disciplinaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disciplinas"]["get"],
  ): Promise<IDomainContracts.DisciplinaListOperationOutput["success"]> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas/{id}"].get)
  async disciplinaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disciplinas/{id}"]["get"],
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas"].post)
  async disciplinaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disciplinas"]["post"],
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas/{id}"].patch)
  async disciplinaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disciplinas/{id}"]["patch"],
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  //

  @Get("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas/{id}/imagem/capa"].get)
  async disciplinaGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas/{id}/imagem/capa"].put)
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
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Disciplinas/{id}"].delete)
  async disciplinaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/disciplinas/{id}"]["delete"],
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

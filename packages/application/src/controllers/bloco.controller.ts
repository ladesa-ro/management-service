
import { type AccessContext, AccessContextHttp } from "@/access-context";

import { ApiDocTypings } from "@ladesa-ro/management-management-service.application.contracts/openapi-v3-typings";
import { BlocoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RotaInputs } from "../helpers/rota-inputs";
import { ApiDocSchema } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) { }

  //

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos"].get)
  async blocoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/blocos"]["get"],,
  ): Promise<IDomainContracts.BlocoListOperationOutput["success"]> {
    return this.blocoService.blocoFindAll(accessContext, combinedInput);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos/{id}"].get)
  async blocoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoFindByIdStrict(accessContext, { id });
  }

  //

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos"].post)
  async blocoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() combinedInput: IDomainContracts.BlocoCreateInput,
  ) {
    return this.blocoService.blocoCreate(accessContext, combinedInput);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos/{id}"].patch)
  async blocoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() combinedInput: IDomainContracts.BlocoUpdateInput,
  ) {
    return this.blocoService.blocoUpdate(accessContext, combinedInput);
  }

  //

  @Get("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos/{id}/imagem/capa"].get)
  async blocoGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos/{id}/imagem/capa"].put)
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
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/Blocos/{id}"].delete)
  async blocoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes/{id}"]["delete"],
  ) {
    return this.blocoService.blocoDeleteOneById(accessContext, {
      id: inputs.parameters.id,
    });
  }

  //
}

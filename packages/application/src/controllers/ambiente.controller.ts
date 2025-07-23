import { type AccessContext, AccessContextHttp } from "@/access-context";
import { AmbienteService } from "@ladesa-ro/management-management-service.domain";
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema, ApiDocTypings } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) { }

  @Get("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes"].get)
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes"]["get"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes"]["get"]["responses"]["200"]["content"]> {
    return this.ambienteService.ambienteFindAll(accessContext, inputs);
  }

  //

  @Get("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes/{id}"].get)
  async ambienteFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes/{id}"]["get"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes/{id}"]["get"]["responses"]["200"]["content"]["application/json"]> {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: inputs.parameters.path.id,
    });
  }

  @Post("/")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes"].post)
  async ambienteCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes"]["post"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes"]["post"]["responses"]["200"]["content"]["application/json"]> {
    return this.ambienteService.ambienteCreate(accessContext, inputs);
  }

  //

  @Patch("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes/{id}"].patch)
  async ambienteUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes/{id}"]["patch"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes/{id}"]["patch"]["responses"]["200"]["content"]["application/json"]> {
    return this.ambienteService.ambienteUpdate(accessContext, inputs);
  }

  //

  @Get("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes/{id}/imagem/capa"].get)
  async ambienteGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes/{id}/imagem/capa"]["get"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes/{id}/imagem/capa"]["get"]["responses"]["200"]["content"]["image/jpeg"]> {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, inputs.parameters.path.id);
  }

  @Put("/:id/imagem/capa")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes/{id}/imagem/capa"].put)
  async ambienteImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes/{id}/imagem/capa"]["put"]["responses"]["200"]["content"]["text/plain"]> {
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, { id: id }, file);
  }

  //

  @Delete("/:id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/ambientes/{id}"].delete)
  async ambienteDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() inputs: ApiDocTypings.paths["/api/v1/ambientes/{id}"]["delete"],
  ): Promise<ApiDocTypings.paths["/api/v1/ambientes/{id}"]["delete"]["responses"]["200"]["content"]["text/plain"]> {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: inputs.parameters.path.id,
    });
  }

  //
}

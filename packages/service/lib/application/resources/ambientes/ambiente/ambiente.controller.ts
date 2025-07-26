import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import type { IApiDoc } from "@/application/standards-new/openapi";
import {
  AccessContext,
  AccessContextHttp,
} from "@/infrastructure/access-context";
import { AmbienteService } from "./ambiente.service";
import { ID } from "@nestjs/graphql";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteList") dto: IApiDoc.operations["AmbienteList"]
  ) {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  @Get("/:id")
  async ambienteFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteFindOneById") dto: IApiDoc.operations["AmbienteFindOneById"]
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async ambienteCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteCreate") dto: IApiDoc.operations["AmbienteCreate"]) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  @Patch("/:id")
  async ambienteUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteUpdateOneById") dto: IApiDoc.operations["AmbienteUpdateOneById"]) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async ambienteGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteGetImagemCapa") dto: IApiDoc.operations["AmbienteGetImagemCapa"]
  ) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, dto.parameters.path.id);
  }

  @Put("/:id/imagem/capa")
  async ambienteImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteSetImagemCapa") dto: IApiDoc.operations["AmbienteSetImagemCapa"],
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(
      accessContext,
      { ID: dto.parameters.path.id },
      file
    );
  }

  @Delete("/:id")
  async ambienteDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteDeleteOneById") dto: IApiDoc.operations["AmbienteDeleteOneById"]  
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

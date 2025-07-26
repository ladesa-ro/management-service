import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AmbienteService } from "./ambiente.service";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  async ambienteFindAll(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteList") dto: IOperationInput<"AmbienteList">) {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  @Get("/:id")
  async ambienteFindById(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteFindOneById") dto: IOperationInput<"AmbienteFindOneById">) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async ambienteCreate(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteCreate") dto: IOperationInput<"AmbienteCreate">) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  @Patch("/:id")
  async ambienteUpdate(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteUpdateOneById") dto: IOperationInput<"AmbienteUpdateOneById">) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  @Get("/:id/imagem/capa")
  async ambienteGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteGetImagemCapa") dto: IOperationInput<"AmbienteGetImagemCapa">) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, id);
  }

  @Put("/:id/imagem/capa")
  async ambienteImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AmbienteSetImagemCapa") dto: IOperationInput<"AmbienteSetImagemCapa">,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, { id: dto.parameters.path.id }, file);
  }

  @Delete("/:id")
  async ambienteDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @HttpOperationInput("AmbienteDeleteOneById") dto: IOperationInput<"AmbienteDeleteOneById">) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

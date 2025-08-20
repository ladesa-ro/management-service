import { Controller, Delete, Get, Patch, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";
import { AmbienteService } from "../domain/ambiente.service";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  async ambienteFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteList") dto: IAppRequest<"AmbienteList">) {
    const domain: IDomain.AmbienteListInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteFindAll(accessContext, domain);
  }

  @Get("/:id")
  async ambienteFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteFindOneById") dto: IAppRequest<"AmbienteFindOneById">) {
    const domain: IDomain.AmbienteFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async ambienteCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteCreate") dto: IAppRequest<"AmbienteCreate">) {
    const domain: IDomain.AmbienteCreateInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteCreate(accessContext, domain);
  }

  @Patch("/:id")
  async ambienteUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteUpdateOneById") dto: IAppRequest<"AmbienteUpdateOneById">) {
    const domain: IDomain.AmbienteFindOneInput & IDomain.AmbienteUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteUpdate(accessContext, domain);
  }

  @Get("/:id/imagem/capa")
  async ambienteGetImagemCapa(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteGetImagemCapa") dto: IAppRequest<"AmbienteGetImagemCapa">) {
    const domain: IDomain.AmbienteFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteGetImagemCapa(accessContext, domain.id);
  }

  @Put("/:id/imagem/capa")
  async ambienteUpdateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("AmbienteSetImagemCapa") dto: IAppRequest<"AmbienteSetImagemCapa">,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const domain: IDomain.AmbienteFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, domain, file);
  }

  @Delete("/:id")
  async ambienteDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AmbienteDeleteOneById") dto: IAppRequest<"AmbienteDeleteOneById">) {
    const domain: IDomain.AmbienteFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.ambienteService.ambienteDeleteOneById(accessContext, domain);
  }
}

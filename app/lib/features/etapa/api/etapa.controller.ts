import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { EtapaService } from "../domain/etapa.service";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  async etapaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaList") dto: IAppRequest<"EtapaList">) {
    const domain: IDomain.EtapaListInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async etapaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaFindOneById") dto: IAppRequest<"EtapaFindOneById">) {
    const domain: IDomain.EtapaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async etapaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaCreate") dto: IAppRequest<"EtapaCreate">) {
    const domain: IDomain.EtapaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async etapaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaUpdateOneById") dto: IAppRequest<"EtapaUpdateOneById">) {
    const domain: IDomain.EtapaFindOneInput & IDomain.EtapaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async etapaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaDeleteOneById") dto: IAppRequest<"EtapaDeleteOneById">) {
    const domain: IDomain.EtapaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaDeleteOneById(accessContext, domain);
  }
}

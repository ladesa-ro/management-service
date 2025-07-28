import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  async etapaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaFindAll") dto: IAppRequest<"EtapaFindAll">) {
    const domain: IDomain.EtapaListInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async etapaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaFindById") dto: IAppRequest<"EtapaFindById">) {
    const domain: IDomain.EtapaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async etapaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaCreate") dto: IAppRequest<"EtapaCreate">) {
    const domain: IDomain.EtapaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async etapaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaUpdate") dto: IAppRequest<"EtapaUpdate">) {
    const domain: IDomain.EtapaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async etapaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaDeleteOneById") dto: IAppRequest<"EtapaDeleteOneById">) {
    const domain: IDomain.EtapaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.etapaService.etapaDeleteOneById(accessContext, domain);
  }
}

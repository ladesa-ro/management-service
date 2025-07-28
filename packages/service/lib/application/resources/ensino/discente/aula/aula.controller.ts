import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Get("/")
  async aulaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaFindAll") dto: IAppRequest<"AulaFindAll">) {
    const domain: IDomain.AulaListInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async aulaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaFindById") dto: IAppRequest<"AulaFindOneById">) {
    const domain: IDomain.AulaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async aulaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaCreate") dto: IAppRequest<"AulaCreate">) {
    const domain: IDomain.AulaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async aulaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaUpdate") dto: IAppRequest<"AulaUpdateOneById">) {
    const domain: IDomain.AulaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async aulaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaDeleteOneById") dto: IAppRequest<"AulaDeleteOneById">) {
    const domain: IDomain.AulaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaDeleteOneById(accessContext, domain);
  }
}

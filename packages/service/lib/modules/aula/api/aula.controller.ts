import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { AulaService } from "../domain/aula.service";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Get("/")
  async aulaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaList") dto: IAppRequest<"AulaList">) {
    const domain: IDomain.AulaListInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async aulaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaFindOneById") dto: IAppRequest<"AulaFindOneById">) {
    const domain: IDomain.AulaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async aulaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaCreate") dto: IAppRequest<"AulaCreate">) {
    const domain: IDomain.AulaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async aulaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaUpdateOneById") dto: IAppRequest<"AulaUpdateOneById">) {
    const domain: IDomain.AulaFindOneInput & IDomain.AulaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async aulaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaDeleteOneById") dto: IAppRequest<"AulaDeleteOneById">) {
    const domain: IDomain.AulaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.aulaService.aulaDeleteOneById(accessContext, domain);
  }
}

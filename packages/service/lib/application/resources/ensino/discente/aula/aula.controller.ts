import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Get("/")
  async aulaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaFindAll") dto: IAppRequest<"AulaFindAll">): Promise<LadesaTypings.AulaListOperationOutput["success"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  @Get("/:id")
  async aulaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaFindById") dto: IAppRequest<"AulaFindById">) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async aulaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaCreate") dto: IAppRequest<"AulaCreate">) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async aulaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaUpdate") dto: IAppRequest<"AulaUpdate">) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async aulaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("AulaDeleteOneById") dto: IAppRequest<"AulaDeleteOneById">) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

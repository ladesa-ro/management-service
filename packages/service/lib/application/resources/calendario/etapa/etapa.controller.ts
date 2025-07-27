import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @AppRequest("EtapaFindAll") dto: IAppRequest<"EtapaFindAll">): Promise<LadesaTypings.EtapaListOperationOutput["success"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  @Get("/:id")
  async etapaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaFindById") dto: IAppRequest<"EtapaFindById">) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async etapaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaCreate") dto: IAppRequest<"EtapaCreate">) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async etapaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaUpdate") dto: IAppRequest<"EtapaUpdate">) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async etapaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("EtapaDeleteOneById") dto: IAppRequest<"EtapaDeleteOneById">) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

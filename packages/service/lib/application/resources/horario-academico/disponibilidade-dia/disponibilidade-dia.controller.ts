import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type IDomain } from "@/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DisponibilidadeDiaController {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  @Get("/")
  async disponibilidadeDiaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeDiaList") dto: IAppRequest<"DisponibilidadeDiaList">) {
    const domain: IDomain.DisponibilidadeDiaListInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async disponibilidadeDiaFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaFindById") dto: IAppRequest<"DisponibilidadeDiaFindOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.path.id });
  }

  @Post("/")
  async disponibilidadeDiaCreate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaCreate") dto: IAppRequest<"DisponibilidadeDiaCreate">,
  ) {
    const domain: IDomain.DisponibilidadeDiaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async disponibilidadeDiaUpdate(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaUpdate") dto: IAppRequest<"DisponibilidadeDiaUpdateOneById">,
  ) {
    const domain: IDomain.DisponibilidadeDiaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async disponibilidadeDiaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeDiaDeleteOneById") dto: IAppRequest<"DisponibilidadeDiaDeleteOneById">,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.path.id });
  }
}

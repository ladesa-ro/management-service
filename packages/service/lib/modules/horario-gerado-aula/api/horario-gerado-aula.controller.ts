import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { HorarioGeradoAulaService } from "./domain/horario-gerado-aula.service";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {
  }

  @Get("/")
  async horarioGeradoAulaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaList") dto: IAppRequest<"HorarioGeradoAulaList">) {
    const domain: IDomain.HorarioGeradoAulaListInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async horarioGeradoAulaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaFindById") dto: IAppRequest<"HorarioGeradoAulaFindOneById">) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, {id: dto.path.id});
  }

  @Post("/")
  async horarioGeradoAulaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaCreate") dto: IAppRequest<"HorarioGeradoAulaCreate">) {
    const domain: IDomain.HorarioGeradoAulaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoAulaService.horarioGeradoAulaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async HorarioGeradoAulaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaUpdate") dto: IAppRequest<"HorarioGeradoAulaUpdateOneById">) {
    const domain: IDomain.HorarioGeradoAulaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoAulaService.horarioGeradoAulaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async HorarioGeradoAulaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoAulaDeleteOneById") dto: IAppRequest<"HorarioGeradoAulaDeleteOneById">) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, {id: dto.path.id});
  }
}

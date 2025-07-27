import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoService } from "./horario-gerado.service";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  async horarioGeradoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoFindAll") dto: IAppRequest<"HorarioGeradoFindAll">) {
    const domain: IDomain.HorarioGeradoListInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async horarioGeradoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoFindById") dto: IAppRequest<"HorarioGeradoFindById">) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  @Post("/")
  async horarioGeradoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoCreate") dto: IAppRequest<"HorarioGeradoCreate">) {
    const domain: IDomain.HorarioGeradoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async horarioGeradoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoUpdate") dto: IAppRequest<"HorarioGeradoUpdate">) {
    const domain: IDomain.HorarioGeradoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async horarioGeradoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoDeleteOneById") dto: IAppRequest<"HorarioGeradoDeleteOneById">) {
    const domain: IDomain.HorarioGeradoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, domain);
  }
}

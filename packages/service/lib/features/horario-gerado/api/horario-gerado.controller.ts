import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { HorarioGeradoService } from "../domain/horario-gerado.service";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  async horarioGeradoFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoList") dto: IAppRequest<"HorarioGeradoList">) {
    const domain: IDomain.HorarioGeradoListInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, domain);
  }

  @Get("/:id")
  async horarioGeradoFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoFindOneById") dto: IAppRequest<"HorarioGeradoFindOneById">) {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, { id: dto.params.id });
  }

  @Post("/")
  async horarioGeradoCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoCreate") dto: IAppRequest<"HorarioGeradoCreate">) {
    const domain: IDomain.HorarioGeradoCreateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, domain);
  }

  @Patch("/:id")
  async horarioGeradoUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoUpdateOneById") dto: IAppRequest<"HorarioGeradoUpdateOneById">) {
    const domain: IDomain.HorarioGeradoFindOneInput & IDomain.HorarioGeradoUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async horarioGeradoDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("HorarioGeradoDeleteOneById") dto: IAppRequest<"HorarioGeradoDeleteOneById">) {
    const domain: IDomain.HorarioGeradoFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, domain);
  }
}

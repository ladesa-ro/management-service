import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { DiaCalendarioService } from "../domain/dia-calendario.service";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  async diaCalendarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiaCalendarioList") dto: IAppRequest<"DiaCalendarioList">) {
    const domain: IDomain.DiaCalendarioListInput = requestRepresentationMergeToDomain(dto);
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diaCalendarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiaCalendarioFindOneById") dto: IAppRequest<"DiaCalendarioFindOneById">) {
    const domain: IDomain.DiaCalendarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async diaCalendarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiaCalendarioCreate") dto: IAppRequest<"DiaCalendarioCreate">) {
    const domain: IDomain.DiaCalendarioCreateInput = requestRepresentationMergeToDomain(dto);
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, domain);
  }

  @Patch("/:id")
  async diaCalendarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiaCalendarioUpdateOneById") dto: IAppRequest<"DiaCalendarioUpdateOneById">) {
    const domain: IDomain.DiaCalendarioFindOneInput & IDomain.DiaCalendarioUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diaCalendarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiaCalendarioDeleteOneById") dto: IAppRequest<"DiaCalendarioDeleteOneById">) {
    const domain: IDomain.DiaCalendarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, domain);
  }
}

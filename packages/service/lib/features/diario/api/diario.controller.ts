import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { DiarioService } from "../domain/diario.service";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  @Get("/")
  async diarioFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioList") dto: IAppRequest<"DiarioList">) {
    const domain: IDomain.DiarioListInput = requestRepresentationMergeToDomain(dto);
    return this.diarioService.diarioFindAll(accessContext, domain);
  }

  @Get("/:id")
  async diarioFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioFindOneById") dto: IAppRequest<"DiarioFindOneById">) {
    const domain: IDomain.DiarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioService.diarioFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async diarioCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioCreate") dto: IAppRequest<"DiarioCreate">) {
    const domain: IDomain.DiarioCreateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioService.diarioCreate(accessContext, domain);
  }

  @Patch("/:id")
  async diarioUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioUpdateOneById") dto: IAppRequest<"DiarioUpdateOneById">) {
    const domain: IDomain.DiarioFindOneInput & IDomain.DiarioUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.diarioService.diarioUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async diarioDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DiarioDeleteOneById") dto: IAppRequest<"DiarioDeleteOneById">) {
    const domain: IDomain.DiarioFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.diarioService.diarioDeleteOneById(accessContext, domain);
  }
}

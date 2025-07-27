import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "./disponibilidade.service";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  @Get("/")
  async disponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeFindAll") dto: IAppRequest<"DisponibilidadeFindAll">) {
    const domain: IDomain.DisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async disponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeFindById") dto: IAppRequest<"DisponibilidadeFindById">,
  ) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async disponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeCreate") dto: IAppRequest<"DisponibilidadeCreate">) {
    const domain: IDomain.DisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async disponibilidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeUpdate") dto: IAppRequest<"DisponibilidadeUpdate">) {
    const domain: IDomain.DisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async disponibilidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeDeleteOneById") dto: IAppRequest<"DisponibilidadeDeleteOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, domain);
  }
}

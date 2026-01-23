import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/domain/disponibilidade.service";
import { AccessContext, AccessContextHttp, AppRequest, type IAppRequest, type IDomain, requestRepresentationMergeToDomain } from "@/shared";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  @Get("/")
  async disponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeList") dto: IAppRequest<"DisponibilidadeList">) {
    const domain: IDomain.DisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async disponibilidadeFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeFindOneById") dto: IAppRequest<"DisponibilidadeFindOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async disponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeCreate") dto: IAppRequest<"DisponibilidadeCreate">) {
    const domain: IDomain.DisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async disponibilidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeUpdateOneById") dto: IAppRequest<"DisponibilidadeUpdateOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput & IDomain.DisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async disponibilidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeDeleteOneById") dto: IAppRequest<"DisponibilidadeDeleteOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, domain);
  }
}

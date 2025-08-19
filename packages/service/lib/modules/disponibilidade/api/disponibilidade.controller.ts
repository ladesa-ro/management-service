import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { DisponibilidadeService } from "./domain/disponibilidade.service";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {
  }

  @Get("/")
  async disponibilidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeList") dto: IAppRequest<"DisponibilidadeList">) {
    const domain: IDomain.DisponibilidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async disponibilidadeFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeFindById") dto: IAppRequest<"DisponibilidadeFindOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async disponibilidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeCreate") dto: IAppRequest<"DisponibilidadeCreate">) {
    const domain: IDomain.DisponibilidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async disponibilidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeUpdate") dto: IAppRequest<"DisponibilidadeUpdateOneById">) {
    const domain: IDomain.DisponibilidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async disponibilidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("DisponibilidadeDeleteOneById") dto: IAppRequest<"DisponibilidadeDeleteOneById">) {
    const domain: IDomain.DisponibilidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, domain);
  }
}

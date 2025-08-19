import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/contracts/generic-adapters";
import { type IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { ModalidadeService } from "./domain/modalidade.service";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {
  }

  @Get("/")
  async modalidadeFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeList") dto: IAppRequest<"ModalidadeList">) {
    const domain: IDomain.ModalidadeListInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeFindAll(accessContext, domain);
  }

  @Get("/:id")
  async modalidadeFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    const domain: IDomain.ModalidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async modalidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeCreate") dto: IAppRequest<"ModalidadeCreate">) {
    const domain: IDomain.ModalidadeCreateInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeCreate(accessContext, domain);
  }

  @Patch("/:id")
  async modalidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeUpdateOneById") dto: IAppRequest<"ModalidadeUpdateOneById">) {
    const domain: IDomain.ModalidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async modalidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    const domain: IDomain.ModalidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, domain);
  }
}

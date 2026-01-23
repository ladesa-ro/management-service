import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { ModalidadeService } from "../domain/modalidade.service";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

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
    const domain: IDomain.ModalidadeFindOneInput & IDomain.ModalidadeUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async modalidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    const domain: IDomain.ModalidadeFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, domain);
  }
}

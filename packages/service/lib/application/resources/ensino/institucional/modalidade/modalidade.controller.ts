import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  @Get("/")
  async modalidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ModalidadeList") dto: IAppRequest<"ModalidadeList">,
  ): Promise<LadesaTypings.ModalidadeListOperationOutput["success"]> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  @Get("/:id")
  async modalidadeFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async modalidadeCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeCreate") dto: IAppRequest<"ModalidadeCreate">) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  @Patch("/:id")
  async modalidadeUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeUpdateOneById") dto: IAppRequest<"ModalidadeUpdateOneById">) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async modalidadeDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ModalidadeDeleteOneById") dto: IAppRequest<"ModalidadeDeleteOneById">) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

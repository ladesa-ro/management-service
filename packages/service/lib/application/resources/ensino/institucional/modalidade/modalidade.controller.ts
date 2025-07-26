import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get("/")
  async modalidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeList") dto: IOperationInput<"ModalidadeList">,
  ): Promise<LadesaTypings.ModalidadeListOperationOutput["success"]> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async modalidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeDeleteOneById") dto: IOperationInput<"ModalidadeDeleteOneById">,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async modalidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeCreate") dto: IOperationInput<"ModalidadeCreate">,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async modalidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeUpdateOneById") dto: IOperationInput<"ModalidadeUpdateOneById">,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async modalidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeDeleteOneById") dto: IOperationInput<"ModalidadeDeleteOneById">,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

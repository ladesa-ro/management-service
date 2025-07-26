import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ModalidadeService } from "./modalidade.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get("/")
  async modalidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindAll") dto: IApiDoc.operations["ModalidadeFindAll"],
  ): Promise<LadesaTypings.ModalidadeListOperationOutput["success"]> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async modalidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeFindById") dto: IApiDoc.operations["ModalidadeFindById"],
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
    @HttpOperationInput("ModalidadeCreate") dto: IApiDoc.operations["ModalidadeCreate"],
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async modalidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeUpdate") dto: IApiDoc.operations["ModalidadeUpdate"],
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async modalidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("ModalidadeDeleteOneById") dto: IApiDoc.operations["ModalidadeDeleteOneById"],
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

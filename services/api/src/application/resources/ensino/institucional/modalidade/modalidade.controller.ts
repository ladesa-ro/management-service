import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModalidadeService } from "./modalidade.service";

@ApiTags("modalidades")
@Controller("/modalidades")
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get("/")
  @Operation(Tokens.ModalidadeList)
  async modalidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeListOperationInput,
  ): Promise<LadesaTypings.ModalidadeListOperationOutput["success"]> {
    return this.modalidadeService.modalidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.ModalidadeFindOneById)
  async modalidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeFindOneByIdOperationOutput,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.ModalidadeCreate)
  async modalidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeCreateOperationInput,
  ) {
    return this.modalidadeService.modalidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.ModalidadeUpdateOneById)
  async modalidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeUpdateByIdOperationInput,
  ) {
    return this.modalidadeService.modalidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.ModalidadeDeleteOneById)
  async modalidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.ModalidadeDeleteByIdOperationInput,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

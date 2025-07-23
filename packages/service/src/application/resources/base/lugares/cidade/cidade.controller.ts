import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CidadeService } from "./cidade.service";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  @Operation(Tokens.CidadeList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeListOperationInput,
  ): Promise<LadesaTypings.CidadeListOperationOutput["success"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  @Operation(Tokens.CidadeFindOneById)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.CidadeFindOneByIdOperationOutput,
  ): Promise<LadesaTypings.CidadeFindOneResultView> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}

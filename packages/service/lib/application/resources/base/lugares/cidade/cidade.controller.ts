import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CidadeService } from "./cidade.service";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindAll") dto: IApiDoc.operations["FindAll"],
  ): Promise<LadesaTypings.CidadeListOperationOutput["success"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindById") dto: IApiDoc.operations["FindById"],
  ): Promise<LadesaTypings.CidadeFindOneResultView> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

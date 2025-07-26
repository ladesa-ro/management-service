import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { CidadeService } from "./cidade.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("cidades")
@Controller("/base/cidades")
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get("/")
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindAll") dto: IOperationInput<"FindAll">,
  ): Promise<LadesaTypings.CidadeListOperationOutput["success"]> {
    return this.cidadeService.findAll(accessContext, dto);
  }

  // ========================================================

  @Get("/:id")
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindById") dto: IOperationInput<"FindById">,
  ): Promise<LadesaTypings.CidadeFindOneResultView> {
    return this.cidadeService.findByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

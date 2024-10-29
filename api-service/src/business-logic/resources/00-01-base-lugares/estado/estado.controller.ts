import { CombinedInput } from "@/business-logic/standards";
import { Operation } from "@/business-logic/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EstadoService } from "./estado.service";

@ApiTags("Estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @Operation(Tokens.EstadoList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoListOperationInput,
  ): Promise<LadesaTypings.EstadoListOperationOutput["success"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @Operation(Tokens.EstadoFindOneById)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.EstadoFindOneByIdOperationOutput,
  ) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}

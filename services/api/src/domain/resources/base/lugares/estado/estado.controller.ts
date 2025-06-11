import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { EstadoService } from "./estado.service";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  @Operation(Tokens.EstadoList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EstadoListOperationInput,
  ): Promise<IDomainContracts.EstadoListOperationOutput["success"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  @Operation(Tokens.EstadoFindOneById)
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.EstadoFindOneByIdOperationOutput,
  ) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
}

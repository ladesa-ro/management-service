import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { HorarioGeradoAulaService } from "./horario-gerado-aula.service";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  @Operation(Tokens.HorarioGeradoAulaList)
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput() dto: IDomainContracts.HorarioGeradoAulaListOperationInput,
  ): Promise<IDomainContracts.HorarioGeradoAulaListOperationOutput["success"]> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.HorarioGeradoAulaFindOneById)
  async horarioGeradoAulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.HorarioGeradoAulaFindByIdOperationOutput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.HorarioGeradoAulaCreate)
  async horarioGeradoAulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.HorarioGeradoAulaCreateOperationInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.HorarioGeradoAulaUpdateOneById)
  async HorarioGeradoAulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.HorarioGeradoAulaUpdateByIdOperationInput,
  ) {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.HorarioGeradoAulaDeleteOneById)
  async HorarioGeradoAulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.HorarioGeradoAulaDeleteByIdOperationInput,
  ) {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}

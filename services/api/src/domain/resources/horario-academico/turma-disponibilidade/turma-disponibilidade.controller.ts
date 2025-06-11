import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  //

  @Get("/")
  @Operation(Tokens.TurmaDisponibilidadeList)
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.TurmaDisponibilidadeListOperationInput,
  ): Promise<IDomainContracts.TurmaDisponibilidadeListOperationOutput["success"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.TurmaDisponibilidadeFindOneById)
  async turmaDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.TurmaDisponibilidadeFindOneByIdOperationOutput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.TurmaDisponibilidadeCreate)
  async turmaDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.TurmaDisponibilidadeCreateOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.TurmaDisponibilidadeUpdateOneById)
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.TurmaDisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.TurmaDisponibilidadeDeleteOneById)
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.TurmaDisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@ApiTags("professores-disponibilidades")
@Controller("/professores-disponibilidades")
export class ProfessorDisponibilidadeController {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) {}

  //

  @Get("/")
  @Operation(Tokens.ProfessorDisponibilidadeList)
  async professorDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.ProfessorDisponibilidadeListOperationInput,
  ): Promise<IDomainContracts.ProfessorDisponibilidadeListOperationOutput["success"]> {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.ProfessorDisponibilidadeFindOneById)
  async professorDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.ProfessorDisponibilidadeFindOneByIdOperationOutput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.ProfessorDisponibilidadeCreate)
  async professorDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.ProfessorDisponibilidadeCreateOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.ProfessorDisponibilidadeUpdateOneById)
  async professorDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.ProfessorDisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.ProfessorDisponibilidadeDeleteOneById)
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: IDomainContracts.ProfessorDisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@ApiTags("professores-disponibilidades")
@Controller("/professores-disponibilidades")
export class ProfessorDisponibilidadeController {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) {}

  //

  @Get("/")
  async professorDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeFindAll") dto: IApiDoc.operations["ProfessorDisponibilidadeFindAll"],
  ): Promise<LadesaTypings.ProfessorDisponibilidadeListOperationOutput["success"]> {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async professorDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeFindById") dto: IApiDoc.operations["ProfessorDisponibilidadeFindById"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  async professorDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeCreate") dto: IApiDoc.operations["ProfessorDisponibilidadeCreate"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async professorDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeUpdate") dto: IApiDoc.operations["ProfessorDisponibilidadeUpdate"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("ProfessorDisponibilidadeDeleteOneById") dto: IApiDoc.operations["ProfessorDisponibilidadeDeleteOneById"],
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}

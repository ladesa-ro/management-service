import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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

    @HttpOperationInput("ProfessorDisponibilidadeFindAll") dto: IOperationInput<"ProfessorDisponibilidadeFindAll">,
  ): Promise<LadesaTypings.ProfessorDisponibilidadeListOperationOutput["success"]> {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async professorDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("ProfessorDisponibilidadeFindById") dto: IOperationInput<"ProfessorDisponibilidadeFindById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async professorDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("ProfessorDisponibilidadeCreate") dto: IOperationInput<"ProfessorDisponibilidadeCreate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async professorDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("ProfessorDisponibilidadeUpdate") dto: IOperationInput<"ProfessorDisponibilidadeUpdate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async professorDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("ProfessorDisponibilidadeDeleteOneById") dto: IOperationInput<"ProfessorDisponibilidadeDeleteOneById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

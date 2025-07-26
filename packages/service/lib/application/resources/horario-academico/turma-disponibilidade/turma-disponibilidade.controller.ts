import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  //

  @Get("/")
  async turmaDisponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaDisponibilidadeFindAll") dto: IOperationInput<"TurmaDisponibilidadeFindAll">,
  ): Promise<LadesaTypings.TurmaDisponibilidadeListOperationOutput["success"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async turmaDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeFindById") dto: IOperationInput<"TurmaDisponibilidadeFindById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async turmaDisponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("TurmaDisponibilidadeCreate") dto: IOperationInput<"TurmaDisponibilidadeCreate">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeUpdate") dto: IOperationInput<"TurmaDisponibilidadeUpdate">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeDeleteOneById") dto: IOperationInput<"TurmaDisponibilidadeDeleteOneById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

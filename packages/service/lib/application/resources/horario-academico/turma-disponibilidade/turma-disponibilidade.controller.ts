import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("TurmaDisponibilidadeFindAll") dto: IApiDoc.operations["TurmaDisponibilidadeFindAll"],
  ): Promise<LadesaTypings.TurmaDisponibilidadeListOperationOutput["success"]> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async turmaDisponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeFindById") dto: IApiDoc.operations["TurmaDisponibilidadeFindById"],
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
    @HttpOperationInput("TurmaDisponibilidadeCreate") dto: IApiDoc.operations["TurmaDisponibilidadeCreate"],
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async turmaDisponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeUpdate") dto: IApiDoc.operations["TurmaDisponibilidadeUpdate"],
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async turmaDisponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("TurmaDisponibilidadeDeleteOneById") dto: IApiDoc.operations["TurmaDisponibilidadeDeleteOneById"],
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}

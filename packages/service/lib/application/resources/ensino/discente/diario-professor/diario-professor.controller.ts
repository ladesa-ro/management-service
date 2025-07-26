import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioProfessorService } from "./diario-professor.service";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get("/")
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorFindAll") dto: IOperationInput<"DiarioProfessorFindAll">,
  ): Promise<LadesaTypings.DiarioProfessorListOperationOutput["success"]> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async diarioProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @HttpOperationInput("DiarioProfessorFindById") dto: IOperationInput<"DiarioProfessorFindById">,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async diarioProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorCreate") dto: IOperationInput<"DiarioProfessorCreate">,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diarioProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorUpdate") dto: IOperationInput<"DiarioProfessorUpdate">,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diarioProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorDeleteOneById") dto: IOperationInput<"DiarioProfessorDeleteOneById">,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}

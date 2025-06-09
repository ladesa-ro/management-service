import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioProfessorService } from "./diario-professor.service";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get("/")
  @Operation(Tokens.DiarioProfessorList)
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorListOperationInput,
  ): Promise<LadesaTypings.DiarioProfessorListOperationOutput["success"]> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DiarioProfessorFindOneById)
  async diarioProfessorFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DiarioProfessorFindOneByIdOperationOutput,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.DiarioProfessorCreate)
  async diarioProfessorCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorCreateOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DiarioProfessorUpdateOneById)
  async diarioProfessorUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorUpdateByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DiarioProfessorDeleteOneById)
  async diarioProfessorDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioProfessorDeleteByIdOperationInput,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}

import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisciplinaService } from "./disciplina.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class DisciplinaResolver {
  constructor(
    //
    private disciplinaService: DisciplinaService,
  ) {}

  //
  
  async disciplinaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindAll") dto: IApiDoc.operations["DisciplinaFindAll"],
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //
  
  async disciplinaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindOneById") dto: IApiDoc.operations["DisciplinaFindOneById"],
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async disciplinaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaCreate") dto: IApiDoc.operations["DisciplinaCreate"],
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaUpdate") dto: IApiDoc.operations["DisciplinaUpdate"],
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  
  async disciplinaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaDeleteOneById") dto: IApiDoc.operations["DisciplinaDeleteOneById"],
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

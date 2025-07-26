import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DisciplinaService } from "./disciplina.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("DisciplinaFindAll") dto: IOperationInput<"DisciplinaFindAll">,
  ) {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  //
  
  async disciplinaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaFindOneById") dto: IOperationInput<"DisciplinaFindOneById">,
  ) {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
  
  async disciplinaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaCreate") dto: IOperationInput<"DisciplinaCreate">,
  ) {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  
  async disciplinaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaUpdate") dto: IOperationInput<"DisciplinaUpdate">,
  ) {
    return this.disciplinaService.disciplinaUpdate(accessContext, dto);
  }

  
  async disciplinaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DisciplinaDeleteOneById") dto: IOperationInput<"DisciplinaDeleteOneById">,
  ) {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

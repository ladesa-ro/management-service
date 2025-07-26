import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { CursoService } from "./curso.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class CursoResolver {
  constructor(
    //
    private cursoService: CursoService,
  ) {}

  //
  
  async cursoFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoFindAll") dto: IApiDoc.operations["CursoFindAll"],
  ) {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  //
  
  async cursoFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoFindOneById") dto: IApiDoc.operations["CursoFindOneById"],
  ) {
    return this.cursoService.cursoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async cursoCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoCreate") dto: IApiDoc.operations["CursoCreate"],
  ) {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  
  async cursoUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoUpdate") dto: IApiDoc.operations["CursoUpdate"],
  ) {
    return this.cursoService.cursoUpdate(accessContext, dto);
  }

  
  async cursoDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("CursoDeleteOneById") dto: IApiDoc.operations["CursoDeleteOneById"],
  ) {
    return this.cursoService.cursoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

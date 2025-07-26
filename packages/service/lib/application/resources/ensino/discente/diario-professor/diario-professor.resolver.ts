import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioProfessorService } from "./diario-professor.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Resolver()
export class DiarioProfessorResolver {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  
  async diarioProfessorFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorFindAll") dto: IOperationInput<"DiarioProfessorFindAll">,
  ) {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  
  async diarioProfessorFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    
    @HttpOperationInput("DiarioProfessorFindOneById") dto: IOperationInput<"DiarioProfessorFindOneById">,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  
  async diarioProfessorCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorCreate") dto: IOperationInput<"DiarioProfessorCreate">,
  ) {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  
  async diarioProfessorUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorUpdate") dto: IOperationInput<"DiarioProfessorUpdate">,
  ) {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, dto);
  }

  
  async diarioProfessorDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("DiarioProfessorDeleteOneById") dto: IOperationInput<"DiarioProfessorDeleteOneById">,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }
}

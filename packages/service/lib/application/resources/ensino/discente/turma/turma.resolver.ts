import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Resolver } from "@nestjs/graphql";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { TurmaService } from "./turma.service";

@Resolver()
export class TurmaResolver {
  constructor(
    //
    private turmaService: TurmaService,
  ) {}

  //
  
  async turmaFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaFindAll") dto: IApiDoc.operations["TurmaFindAll"],
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //
  
  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaFindOneById") dto: IApiDoc.operations["TurmaFindOneById"],
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaCreate") dto: IApiDoc.operations["TurmaCreate"],
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  
  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaUpdate") dto: IApiDoc.operations["TurmaUpdate"],
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  
  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaDeleteOneById") dto: IApiDoc.operations["TurmaDeleteOneById"],
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

import { Resolver } from "@nestjs/graphql";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("TurmaFindAll") dto: IOperationInput<"TurmaFindAll">,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaFindOneById") dto: IOperationInput<"TurmaFindOneById">,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaCreate") dto: IOperationInput<"TurmaCreate">,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaUpdate") dto: IOperationInput<"TurmaUpdate">,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("TurmaDeleteOneById") dto: IOperationInput<"TurmaDeleteOneById">,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

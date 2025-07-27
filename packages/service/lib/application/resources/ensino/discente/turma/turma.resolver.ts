import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
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
    @AppRequest("TurmaFindAll") dto: IAppRequest<"TurmaFindAll">,
  ) {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  //

  async turmaFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("TurmaFindOneById") dto: IAppRequest<"TurmaFindOneById">,
  ) {
    return this.turmaService.turmaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async turmaCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("TurmaCreate") dto: IAppRequest<"TurmaCreate">,
  ) {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  async turmaUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("TurmaUpdate") dto: IAppRequest<"TurmaUpdate">,
  ) {
    return this.turmaService.turmaUpdate(accessContext, dto);
  }

  async turmaDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("TurmaDeleteOneById") dto: IAppRequest<"TurmaDeleteOneById">,
  ) {
    return this.turmaService.turmaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { TurmaDisponibilidadeService } from "./turma-disponibilidade.service";

@GqlResolver()
export class TurmaDisponibilidadeResolver {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  async turmaDisponibilidadeFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @AppRequest("TurmaDisponibilidadeList") dto: IAppRequest<"TurmaDisponibilidadeList">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async turmaDisponibilidadeFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeFindOneById") dto: IAppRequest<"TurmaDisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async turmaDisponibilidadeCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("TurmaDisponibilidadeCreate") dto: IAppRequest<"TurmaDisponibilidadeCreate">) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
  }

  async turmaDisponibilidadeUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeUpdate") dto: IAppRequest<"TurmaDisponibilidadeUpdateOneById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, dto);
  }

  async turmaDisponibilidadeDeleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("TurmaDisponibilidadeDeleteOneById") dto: IAppRequest<"TurmaDisponibilidadeDeleteOneById">,
  ) {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(accessContext, dto);
  }
}

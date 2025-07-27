import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { ProfessorDisponibilidadeService } from "./professor-disponibilidade.service";

@GqlResolver()
export class ProfessorDisponibilidadeResolver {
  constructor(private professorDisponibilidadeService: ProfessorDisponibilidadeService) {}

  async professorDisponibilidadeFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeFindAll") dto: IAppRequest<"ProfessorDisponibilidadeFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async professorDisponibilidadeFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeFindOneById") dto: IAppRequest<"ProfessorDisponibilidadeFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async professorDisponibilidadeCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeCreate") dto: IAppRequest<"ProfessorDisponibilidadeCreate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeCreate(accessContext, dto);
  }

  async professorDisponibilidadeUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeUpdate") dto: IAppRequest<"ProfessorDisponibilidadeUpdate">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeUpdate(accessContext, dto);
  }

  async professorDisponibilidadeDeleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("ProfessorDisponibilidadeDeleteOneById") dto: IAppRequest<"ProfessorDisponibilidadeDeleteOneById">,
  ) {
    return this.professorDisponibilidadeService.professorDisponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

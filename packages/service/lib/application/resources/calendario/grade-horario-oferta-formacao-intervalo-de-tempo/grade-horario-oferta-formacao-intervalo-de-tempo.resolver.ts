import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "./grade-horario-oferta-formacao-intervalo-de-tempo.service";

@GqlResolver()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoResolver {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, dto);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

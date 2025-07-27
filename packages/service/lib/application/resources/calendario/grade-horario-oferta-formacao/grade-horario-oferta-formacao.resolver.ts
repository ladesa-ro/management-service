import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { graphqlExtractSelection } from "@/infrastructure/integrations";
import { GradeHorarioOfertaFormacaoService } from "./grade-horario-oferta-formacao.service";

@GqlResolver()
export class GradeHorarioOfertaFormacaoResolver {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  async gradeHorarioOfertaFormacaoFindAll(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoFindAll") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindAll">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  async gradeHorarioOfertaFormacaoFindOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoFindOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoFindOneById">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.parameters.path.id,
      },
      ["id", ...graphqlExtractSelection(info)],
    );
  }

  async gradeHorarioOfertaFormacaoCreate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoCreate") dto: IAppRequest<"GradeHorarioOfertaFormacaoCreate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(accessContext, dto);
  }

  async gradeHorarioOfertaFormacaoUpdate(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoUpdate") dto: IAppRequest<"GradeHorarioOfertaFormacaoUpdate">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, dto);
  }

  async gradeHorarioOfertaFormacaoDeleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,

    @AppRequest("GradeHorarioOfertaFormacaoDeleteOneById") dto: IAppRequest<"GradeHorarioOfertaFormacaoDeleteOneById">,
  ) {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

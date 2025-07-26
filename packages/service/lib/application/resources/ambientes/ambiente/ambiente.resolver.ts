import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { AmbienteService } from "./ambiente.service";

@GqlResolver()
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}

  //

  async ambienteFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteList") dto: IOperationInput<"AmbienteList">,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ambienteService.ambienteFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //

  async ambienteFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteFindOneById") dto: IOperationInput<"AmbienteFindOneById">,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  async ambienteCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteCreate") dto: IOperationInput<"AmbienteCreate">,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  async ambienteUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteUpdate") dto: IOperationInput<"AmbienteUpdate">,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  async ambienteDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteDeleteOneById") dto: IOperationInput<"AmbienteDeleteOneById">,
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}

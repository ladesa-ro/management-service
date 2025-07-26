import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/application/standards";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { AmbienteService } from "./ambiente.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import type { IApiDoc } from "@/application/standards-new/openapi";

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
    @HttpOperationInput("AmbienteList") dto: IApiDoc.operations["AmbienteList"],
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ambienteService.ambienteFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }

  //
  
  async ambienteFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteFindOneById") dto: IApiDoc.operations["AmbienteFindOneById"],
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //
  
  async ambienteCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteCreate") dto: IApiDoc.operations["AmbienteCreate"],
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  
  async ambienteUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteUpdate") dto: IApiDoc.operations["AmbienteUpdate"],
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  
  async ambienteDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @HttpOperationInput("AmbienteDeleteOneById") dto: IApiDoc.operations["AmbienteDeleteOneById"],
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

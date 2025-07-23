import { CombinedInput, graphqlExtractSelection } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Info as GqlInfo, Resolver as GqlResolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AmbienteService } from "./ambiente.service";

@GqlResolver()
export class AmbienteResolver {
  constructor(
    //
    private ambienteService: AmbienteService,
  ) {}
  //
  @Operation(Tokens.AmbienteList)
  async ambienteFindAll(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteListOperationInput,
    @GqlInfo() info: GraphQLResolveInfo,
  ) {
    return this.ambienteService.ambienteFindAll(accessContext, dto, graphqlExtractSelection(info, "paginated"));
  }
  //
  @Operation(Tokens.AmbienteFindOneById)
  async ambienteFindOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteFindOneByIdOperationOutput,
  ) {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }
  //
  @Operation(Tokens.AmbienteCreate)
  async ambienteCreate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteCreateOperationInput,
  ) {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }
  @Operation(Tokens.AmbienteUpdateOneById)
  async ambienteUpdate(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteUpdateByIdOperationInput,
  ) {
    return this.ambienteService.ambienteUpdate(accessContext, dto);
  }

  @Operation(Tokens.AmbienteDeleteOneById)
  async ambienteDeleteOneById(
    //
    @AccessContextGraphQl() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AmbienteDeleteByIdOperationInput,
  ) {
    return this.ambienteService.ambienteDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }
}

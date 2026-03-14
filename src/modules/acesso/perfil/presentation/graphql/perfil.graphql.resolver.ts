import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IPerfilSetVinculosCommandHandler } from "@/modules/acesso/perfil/domain/commands/perfil-set-vinculos.command.handler.interface";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IPerfilListQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-list.query.handler.interface";
import {
  PerfilFindOneOutputGraphQlDto,
  PerfilListInputGraphQlDto,
  PerfilListOutputGraphQlDto,
  PerfilSetVinculosInputGraphQlDto,
} from "./perfil.graphql.dto";
import { PerfilGraphqlMapper } from "./perfil.graphql.mapper";

@Resolver(() => PerfilFindOneOutputGraphQlDto)
export class PerfilGraphqlResolver {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Query(() => PerfilListOutputGraphQlDto, { name: "perfilFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: PerfilListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<IPerfilListQueryHandler>(IPerfilListQueryHandler);
    const result = await listHandler.execute({ accessContext, dto: input });
    return PerfilGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => PerfilFindOneOutputGraphQlDto, { name: "perfilFindById", nullable: true })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilFindOneOutputGraphQlDto | null> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IPerfilFindOneQueryHandler>(
      IPerfilFindOneQueryHandler,
    );
    const result = await findOneHandler.execute({ accessContext, dto: { id, selection } });
    if (!result) {
      return null;
    }
    return PerfilGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => PerfilListOutputGraphQlDto, { name: "perfilSetVinculos" })
  async setVinculos(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: PerfilSetVinculosInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PerfilListOutputGraphQlDto> {
    const input = PerfilGraphqlMapper.toSetVinculosInput(dto);
    const setVinculosHandler = this.container.get<IPerfilSetVinculosCommandHandler>(
      IPerfilSetVinculosCommandHandler,
    );
    const result = await setVinculosHandler.execute({ accessContext, dto: input });
    return PerfilGraphqlMapper.toListOutputDto(result);
  }
}

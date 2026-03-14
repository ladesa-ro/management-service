import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IModalidadeCreateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { IModalidadeDeleteCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import { IModalidadeUpdateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { IModalidadeListQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-list.query.handler.interface";
import {
  ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";
import { ModalidadeGraphqlMapper } from "./modalidade.graphql.mapper";

@Resolver(() => ModalidadeFindOneOutputGraphQlDto)
export class ModalidadeGraphqlResolver {
  constructor(
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
  ) {}

  @Query(() => ModalidadeListOutputGraphQlDto, { name: "modalidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ModalidadeListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeListOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<IModalidadeListQueryHandler>(
      IModalidadeListQueryHandler,
    );
    const result = await listHandler.execute({ accessContext, dto: input });
    return ModalidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ModalidadeFindOneOutputGraphQlDto, { name: "modalidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IModalidadeFindOneQueryHandler>(
      IModalidadeFindOneQueryHandler,
    );
    const result = await findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, Modalidade.entityName, id);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, { name: "modalidadeCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: ModalidadeCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<IModalidadeCreateCommandHandler>(
      IModalidadeCreateCommandHandler,
    );
    const result = await createHandler.execute({ accessContext, dto: input });
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputGraphQlDto, { name: "modalidadeUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: ModalidadeUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputGraphQlDto> {
    const input = ModalidadeGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<IModalidadeUpdateCommandHandler>(
      IModalidadeUpdateCommandHandler,
    );
    const result = await updateHandler.execute({ accessContext, dto: input });
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "modalidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IModalidadeDeleteCommandHandler>(
      IModalidadeDeleteCommandHandler,
    );
    return deleteHandler.execute({ accessContext, dto: { id } });
  }
}

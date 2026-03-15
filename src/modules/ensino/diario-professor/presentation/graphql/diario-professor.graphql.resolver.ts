import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { IDiarioProfessorCreateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { IDiarioProfessorDeleteCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import { IDiarioProfessorUpdateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor";
import { IDiarioProfessorFindOneQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import { IDiarioProfessorListQueryHandler } from "@/modules/ensino/diario-professor/domain/queries/diario-professor-list.query.handler.interface";
import {
  DiarioProfessorCreateInputGraphQlDto,
  DiarioProfessorFindOneOutputGraphQlDto,
  DiarioProfessorListInputGraphQlDto,
  DiarioProfessorListOutputGraphQlDto,
  DiarioProfessorUpdateInputGraphQlDto,
} from "./diario-professor.graphql.dto";
import { DiarioProfessorGraphqlMapper } from "./diario-professor.graphql.mapper";

@Resolver(() => DiarioProfessorFindOneOutputGraphQlDto)
export class DiarioProfessorGraphqlResolver {
  constructor(
    @DeclareDependency(IContainer)
    private readonly container: IContainer,
  ) {}

  @Query(() => DiarioProfessorListOutputGraphQlDto, { name: "diarioProfessorFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: DiarioProfessorListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorListOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const listHandler = this.container.get<IDiarioProfessorListQueryHandler>(
      IDiarioProfessorListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return DiarioProfessorGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IDiarioProfessorFindOneQueryHandler>(
      IDiarioProfessorFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, DiarioProfessor.entityName, id);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("input") dto: DiarioProfessorCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toCreateInput(dto);
    const createHandler = this.container.get<IDiarioProfessorCreateCommandHandler>(
      IDiarioProfessorCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => DiarioProfessorFindOneOutputGraphQlDto, { name: "diarioProfessorUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("input") dto: DiarioProfessorUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DiarioProfessorFindOneOutputGraphQlDto> {
    const input = DiarioProfessorGraphqlMapper.toUpdateInput({ id }, dto);
    const updateHandler = this.container.get<IDiarioProfessorUpdateCommandHandler>(
      IDiarioProfessorUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return DiarioProfessorGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "diarioProfessorDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const deleteHandler = this.container.get<IDiarioProfessorDeleteCommandHandler>(
      IDiarioProfessorDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, { id });
  }
}

import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import {
  AccessContext,
  AccessContextGraphQL,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { graphqlExtractSelection } from "@/Ladesa.Management.Application/@shared/infrastructure/graphql";
import { AulaService } from "@/Ladesa.Management.Application/horarios/aula/application/use-cases/aula.service";
import {
  AulaCreateInputGraphQlDto,
  AulaFindOneOutputGraphQlDto,
  AulaListInputGraphQlDto,
  AulaListOutputGraphQlDto,
  AulaUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/AulaGraphqlDto";
import { AulaGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/AulaGraphqlMapper";

@Resolver(() => AulaFindOneOutputGraphQlDto)
export class AulaGraphqlResolver {
  constructor(private readonly aulaService: AulaService) {}

  @Query(() => AulaListOutputGraphQlDto, { name: "aulaFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: AulaListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaListOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.aulaService.findAll(accessContext, input);
    return AulaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => AulaFindOneOutputGraphQlDto, { name: "aulaFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.aulaService.findByIdStrict(accessContext, { id, selection });
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputGraphQlDto, { name: "aulaCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: AulaCreateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toCreateInput(dto);
    const result = await this.aulaService.create(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => AulaFindOneOutputGraphQlDto, { name: "aulaUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: AulaUpdateInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AulaFindOneOutputGraphQlDto> {
    const input = AulaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.aulaService.update(accessContext, input);
    return AulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "aulaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.aulaService.deleteOneById(accessContext, { id });
  }
}

import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ModalidadeService } from "@/modules/modalidade/application/use-cases/modalidade.service";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeUpdateInputDto,
} from "../rest/modalidade.rest.dto";
import { ModalidadeListInputGqlDto, ModalidadeListOutputGqlDto } from "./modalidade.graphql.dto";
import { ModalidadeGraphqlMapper } from "./modalidade.graphql.mapper";

@Resolver(() => ModalidadeFindOneOutputDto)
export class ModalidadeGraphqlResolver {
  constructor(private readonly modalidadeService: ModalidadeService) {}

  @Query(() => ModalidadeListOutputGqlDto, { name: "modalidadeFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ModalidadeListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeListOutputGqlDto> {
    const input = ModalidadeGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.modalidadeService.findAll(accessContext, input);
    return ModalidadeGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ModalidadeFindOneOutputDto, { name: "modalidadeFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.modalidadeService.findByIdStrict(accessContext, { id, selection });
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputDto, { name: "modalidadeCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: ModalidadeCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputDto> {
    const input = ModalidadeGraphqlMapper.toCreateInput(dto);
    const result = await this.modalidadeService.create(accessContext, input);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => ModalidadeFindOneOutputDto, { name: "modalidadeUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: ModalidadeUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ModalidadeFindOneOutputDto> {
    const input = ModalidadeGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.modalidadeService.update(accessContext, input);
    return ModalidadeGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "modalidadeDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.modalidadeService.deleteOneById(accessContext, { id });
  }
}

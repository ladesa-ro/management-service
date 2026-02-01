import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { HorarioGeradoAulaService } from "@/modules/horario-gerado-aula";
import { AccessContext, AccessContextGraphQl } from "@/v2/old/infrastructure/access-context";
import {
  HorarioGeradoAulaCreateInputRestDto,
  HorarioGeradoAulaFindOneOutputRestDto,
  HorarioGeradoAulaUpdateInputRestDto,
} from "../rest/horario-gerado-aula.rest.dto";
import {
  HorarioGeradoAulaListInputGqlDto,
  HorarioGeradoAulaListOutputGqlDto,
} from "./horario-gerado-aula.graphql.dto";
import { HorarioGeradoAulaGraphqlMapper } from "./horario-gerado-aula.graphql.mapper";

@Resolver(() => HorarioGeradoAulaFindOneOutputRestDto)
export class HorarioGeradoAulaGraphqlResolver {
  constructor(private readonly horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Query(() => HorarioGeradoAulaListOutputGqlDto, { name: "horarioGeradoAulaFindAll" })
  async findAll(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args() dto: HorarioGeradoAulaListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaListOutputGqlDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.horarioGeradoAulaService.horarioGeradoAulaFindAll(
      accessContext,
      input,
    );
    return HorarioGeradoAulaGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => HorarioGeradoAulaFindOneOutputRestDto, { name: "horarioGeradoAulaFindById" })
  async findById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(
      accessContext,
      {
        id,
        selection,
      },
    );
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoAulaFindOneOutputRestDto, { name: "horarioGeradoAulaCreate" })
  async create(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("data") dto: HorarioGeradoAulaCreateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toCreateInput(dto);
    const result = await this.horarioGeradoAulaService.horarioGeradoAulaCreate(
      accessContext,
      input,
    );
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => HorarioGeradoAulaFindOneOutputRestDto, { name: "horarioGeradoAulaUpdate" })
  async update(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: HorarioGeradoAulaUpdateInputRestDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const input = HorarioGeradoAulaGraphqlMapper.toUpdateInput(id, dto);
    const result = await this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(
      accessContext,
      input,
    );
    return HorarioGeradoAulaGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "horarioGeradoAulaDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQl() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, { id });
  }
}

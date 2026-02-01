import { Args, ID, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { AccessContext, AccessContextGraphQL } from "@/modules/@core/access-context";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { EventoService } from "@/modules/evento/application/use-cases/evento.service";
import {
  EventoCreateInputDto,
  EventoFindOneOutputDto,
  EventoUpdateInputDto,
} from "../rest/evento.rest.dto";
import { EventoListInputGqlDto, EventoListOutputGqlDto } from "./evento.graphql.dto";
import { EventoGraphqlMapper } from "./evento.graphql.mapper";

@Resolver(() => EventoFindOneOutputDto)
export class EventoGraphqlResolver {
  constructor(private readonly eventoService: EventoService) {}

  @Query(() => EventoListOutputGqlDto, { name: "eventoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: EventoListInputGqlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EventoListOutputGqlDto> {
    const input = EventoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.eventoService.findAll(accessContext, input);
    return EventoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => EventoFindOneOutputDto, { name: "eventoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EventoFindOneOutputDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.eventoService.findByIdStrict(accessContext, { id, selection });
    return EventoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EventoFindOneOutputDto, { name: "eventoCreate" })
  async create(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("data") dto: EventoCreateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EventoFindOneOutputDto> {
    const input = EventoGraphqlMapper.toCreateInput(dto);
    const result = await this.eventoService.create(accessContext, input);
    return EventoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => EventoFindOneOutputDto, { name: "eventoUpdate" })
  async update(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Args("data") dto: EventoUpdateInputDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<EventoFindOneOutputDto> {
    const findOneInput = EventoGraphqlMapper.toFindOneInput(id);
    const updateInput = EventoGraphqlMapper.toUpdateInput(dto);
    const result = await this.eventoService.update(accessContext, {
      id: findOneInput.id,
      ...updateInput,
    });
    return EventoGraphqlMapper.toFindOneOutputDto(result);
  }

  @Mutation(() => Boolean, { name: "eventoDeleteOneById" })
  async deleteOneById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    const input = EventoGraphqlMapper.toFindOneInput(id);
    return this.eventoService.deleteOneById(accessContext, input);
  }
}

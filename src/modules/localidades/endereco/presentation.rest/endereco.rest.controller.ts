import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";

import { Endereco } from "@/modules/localidades/endereco/domain/endereco";
import {
  IEnderecoCreateOrUpdateCommandHandler,
} from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import {
  EnderecoDeleteCommandMetadata,
  IEnderecoDeleteCommandHandler,
} from "@/modules/localidades/endereco/domain/commands/endereco-delete.command.handler.interface";
import {
  EnderecoFindOneQueryMetadata,
  IEnderecoFindOneQueryHandler,
} from "@/modules/localidades/endereco/domain/queries/endereco-find-one.query.handler.interface";
import {
  EnderecoListQueryMetadata,
  IEnderecoListQueryHandler,
} from "@/modules/localidades/endereco/domain/queries/endereco-list.query.handler.interface";

import {
  EnderecoFindOneInputRestDto,
  EnderecoFindOneOutputRestDto,
  EnderecoInputRestDto,
  EnderecoListInputRestDto,
  EnderecoListOutputRestDto,
} from "./endereco.rest.dto";
import * as EnderecoRestMapper from "./endereco.rest.mapper";

@ApiTags("enderecos")
@Controller("/enderecos")
export class EnderecoRestController {
  constructor(
    @Dep(IEnderecoListQueryHandler)
    private readonly listHandler: IEnderecoListQueryHandler,
    @Dep(IEnderecoFindOneQueryHandler)
    private readonly findOneHandler: IEnderecoFindOneQueryHandler,
    @Dep(IEnderecoCreateOrUpdateCommandHandler)
    private readonly createOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
    @Dep(IEnderecoDeleteCommandHandler)
    private readonly deleteHandler: IEnderecoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(EnderecoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EnderecoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EnderecoListInputRestDto,
  ): Promise<EnderecoListOutputRestDto> {
    const query = EnderecoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EnderecoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(EnderecoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EnderecoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EnderecoFindOneInputRestDto,
  ): Promise<EnderecoFindOneOutputRestDto> {
    const query = { id: params.id };
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Endereco.entityName, query.id);
    return EnderecoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um endereço", operationId: "enderecoCreate" })
  @ApiCreatedResponse({ type: EnderecoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EnderecoInputRestDto,
  ): Promise<EnderecoFindOneOutputRestDto> {
    const command = EnderecoRestMapper.createInputDtoToCreateCommand.map(dto);
    const { id } = await this.createOrUpdateHandler.execute(accessContext, { id: null, dto: command });
    
    const queryResult = await this.findOneHandler.execute(accessContext, { id: String(id) });
    ensureExists(queryResult, Endereco.entityName, String(id));
    return EnderecoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um endereço", operationId: "enderecoUpdate" })
  @ApiOkResponse({ type: EnderecoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EnderecoFindOneInputRestDto,
    @Body() dto: EnderecoInputRestDto,
  ): Promise<EnderecoFindOneOutputRestDto> {
    const command = EnderecoRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    await this.createOrUpdateHandler.execute(accessContext, { id: command.id, dto: command.dto });
    
    const queryResult = await this.findOneHandler.execute(accessContext, { id: command.id });
    ensureExists(queryResult, Endereco.entityName, command.id);
    return EnderecoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(EnderecoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EnderecoFindOneInputRestDto,
  ): Promise<boolean> {
    return this.deleteHandler.execute(accessContext, { id: params.id });
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
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
import {
  EstagiarioCreateCommandMetadata,
  IEstagiarioCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import {
  EstagiarioDeleteCommandMetadata,
  IEstagiarioDeleteCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import {
  EstagiarioUpdateCommandMetadata,
  IEstagiarioUpdateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import {
  EstagiarioFindOneQueryMetadata,
  IEstagiarioFindOneQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import {
  EstagiarioListQueryMetadata,
  IEstagiarioListQueryHandler,
} from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories/estagiario.repository.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioSemEstagioInputRestDto,
  EstagiarioSemEstagioOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import * as EstagiarioRestMapper from "./estagiario.rest.mapper";

@ApiTags("estagiarios")
@Controller("/estagiarios")
export class EstagiarioRestController {
  constructor(
    @Dep(IEstagiarioListQueryHandler)
    private readonly listHandler: IEstagiarioListQueryHandler,
    @Dep(IEstagiarioFindOneQueryHandler)
    private readonly findOneHandler: IEstagiarioFindOneQueryHandler,
    @Dep(IEstagiarioCreateCommandHandler)
    private readonly createHandler: IEstagiarioCreateCommandHandler,
    @Dep(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @Dep(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  @Get("/")
  @ApiOperation(EstagiarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: EstagiarioListInputRestDto,
  ): Promise<EstagiarioListOutputRestDto> {
    const query = EstagiarioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return EstagiarioRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/sem-estagio")
  @ApiOperation({
    operationId: "estagiarioFindSemEstagio",
    summary: "Lista alunos matriculados sem estágio ativo",
    description:
      "Retorna alunos matriculados no 3º ano (ou período informado) que ainda não possuem contrato de estágio ativo, priorizando os mais próximos da conclusão.",
  })
  @ApiOkResponse({ type: EstagiarioSemEstagioOutputRestDto })
  @ApiForbiddenResponse()
  async findSemEstagio(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() query: EstagiarioSemEstagioInputRestDto,
  ): Promise<EstagiarioSemEstagioOutputRestDto> {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;
    const periodo = query.periodo ?? "3";

    const { items, total } = await this.estagiarioRepository.findSemEstagio(accessContext, {
      cursoId: query.cursoId,
      periodo,
      page,
      limit,
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: items,
      meta: {
        totalItems: total,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
        search: "",
        sortBy: [
          ["periodo", "DESC"],
          ["nome", "ASC"],
        ],
      },
    };
  }

  @Get("/:id")
  @ApiOperation(EstagiarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const query = EstagiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Estagiario.entityName, query.id);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(EstagiarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagiarioCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const command = EstagiarioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(EstagiarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
    @Body() dto: EstagiarioUpdateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const command = EstagiarioRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Delete("/:id")
  @ApiOperation(EstagiarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const query = EstagiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    await this.deleteHandler.execute(accessContext, query);
    return true;
  }
}

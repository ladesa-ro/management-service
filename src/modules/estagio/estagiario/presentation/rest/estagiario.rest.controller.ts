import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { IEstagiarioCreateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import { IEstagiarioDeleteCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import { IEstagiarioUpdateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { IEstagiarioFindOneQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.handler.interface";
import { IEstagiarioListQueryHandler } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.handler.interface";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import { EstagiarioRestMapper } from "./estagiario.rest.mapper";

@ApiTags("estagiarios")
@Controller("/estagiarios")
export class EstagiarioRestController {
  constructor(
    @Inject(IEstagiarioListQueryHandler) private readonly listHandler: IEstagiarioListQueryHandler,
    @Inject(IEstagiarioFindOneQueryHandler)
    private readonly findOneHandler: IEstagiarioFindOneQueryHandler,
    @Inject(IEstagiarioCreateCommandHandler)
    private readonly createHandler: IEstagiarioCreateCommandHandler,
    @Inject(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @Inject(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estagiários", operationId: "estagiarioFindAll" })
  @ApiOkResponse({ type: EstagiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstagiarioListInputRestDto,
  ): Promise<EstagiarioListOutputRestDto> {
    const input = EstagiarioRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return EstagiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estagiário por ID", operationId: "estagiarioFindById" })
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    if (!result) {
      throw new ResourceNotFoundError("Estagiario", input.id);
    }
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um estagiário", operationId: "estagiarioCreate" })
  @ApiBody({ type: EstagiarioCreateInputRestDto })
  @ApiCreatedResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EstagiarioCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um estagiário", operationId: "estagiarioUpdate" })
  @ApiBody({ type: EstagiarioUpdateInputRestDto })
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
    @Body() dto: EstagiarioUpdateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toUpdateInput(dto);
    const result = await this.updateHandler.execute({ accessContext, id: params.id, dto: input });
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Deleta um estagiário", operationId: "estagiarioDelete" })
  @ApiOkResponse({ description: "Estagiário deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<{ message: string }> {
    await this.deleteHandler.execute({ accessContext, id: params.id });
    return { message: "Estagiário deletado com sucesso" };
  }
}

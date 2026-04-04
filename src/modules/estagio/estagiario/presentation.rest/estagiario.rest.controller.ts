import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiConsumes,
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
  EstagiarioBatchCreateCommandMetadata,
  IEstagiarioBatchCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands/estagiario-batch-create.command.handler.interface";
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
import { AccessContextHttp } from "@/server/nest/access-context";
import { EstagiarioBatchCreateFromFileJobService } from "../application/jobs/estagiario-batch-create-from-file.job.service";
import {
  EstagiarioBatchCreateInputRestDto,
  EstagiarioBatchJobFindOneInputRestDto,
  EstagiarioBatchJobOutputRestDto,
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
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
    @Dep(IEstagiarioBatchCreateCommandHandler)
    private readonly batchCreateHandler: IEstagiarioBatchCreateCommandHandler,
    private readonly batchCreateFromFileJobService: EstagiarioBatchCreateFromFileJobService,
    @Dep(IEstagiarioUpdateCommandHandler)
    private readonly updateHandler: IEstagiarioUpdateCommandHandler,
    @Dep(IEstagiarioDeleteCommandHandler)
    private readonly deleteHandler: IEstagiarioDeleteCommandHandler,
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

  @Post("/batch")
  @HttpCode(202)
  @ApiOperation({
    operationId: "estagiarioBatchJobCreate",
    summary: "Inicia job de cadastro em massa de estagiários via arquivo JSON",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiAcceptedResponse({ type: EstagiarioBatchJobOutputRestDto })
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file"))
  async batchCreate(
    @AccessContextHttp() accessContext: IAccessContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<EstagiarioBatchJobOutputRestDto> {
    const job = this.batchCreateFromFileJobService.start(accessContext, file);
    return EstagiarioRestMapper.batchJobToOutputDto.map(job);
  }

  @Post("/batch/sync")
  @ApiOperation(EstagiarioBatchCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: [EstagiarioFindOneOutputRestDto] })
  @ApiForbiddenResponse()
  async batchCreateSync(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: EstagiarioBatchCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto[]> {
    const command = EstagiarioRestMapper.batchCreateInputDtoToCommand.map(dto);
    const queryResults = await this.batchCreateHandler.execute(accessContext, command);
    return queryResults.map((queryResult) =>
      EstagiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult),
    );
  }

  @Get("/batch/job/:jobId")
  @ApiOperation({
    operationId: "estagiarioBatchJobFindById",
    summary: "Consulta status do job de cadastro em massa de estagiários",
  })
  @ApiOkResponse({ type: EstagiarioBatchJobOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findBatchJobById(
    @Param() params: EstagiarioBatchJobFindOneInputRestDto,
  ): Promise<EstagiarioBatchJobOutputRestDto> {
    const job = this.batchCreateFromFileJobService.getById(params.jobId);
    ensureExists(job, "EstagiarioBatchJob", params.jobId);
    return EstagiarioRestMapper.batchJobToOutputDto.map(job);
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

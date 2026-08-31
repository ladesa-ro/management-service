import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { AccessContextHttp } from "@/server/nest/access-context";
import { UPLOAD_LIMITS } from "@/shared/presentation/rest";
import {
  IRelatorioDeleteCommandHandler,
  IRelatorioUploadPdfCommandHandler,
} from "../domain/commands";
import {
  IRelatorioFindByEstagioQueryHandler,
  IRelatorioGetPdfQueryHandler,
  RelatorioFindByEstagioQueryMetadata,
  RelatorioGetPdfQueryMetadata,
} from "../domain/queries";
import { Relatorio } from "../domain/relatorio";
import { EstagioRelatorioParamsRestDto, RelatorioFindOneOutputRestDto } from "./relatorio.rest.dto";
import * as RelatorioRestMapper from "./relatorio.rest.mapper";

@ApiTags("estagios")
@Controller("/estagios/:id/relatorio")
export class EstagioRelatorioRestController {
  constructor(
    @Dep(IRelatorioFindByEstagioQueryHandler)
    private readonly findByEstagioHandler: IRelatorioFindByEstagioQueryHandler,
    @Dep(IRelatorioUploadPdfCommandHandler)
    private readonly uploadPdfHandler: IRelatorioUploadPdfCommandHandler,
    @Dep(IRelatorioGetPdfQueryHandler)
    private readonly getPdfHandler: IRelatorioGetPdfQueryHandler,
    @Dep(IRelatorioDeleteCommandHandler)
    private readonly deleteHandler: IRelatorioDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(RelatorioFindByEstagioQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findByEstagio(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const queryResult = await this.findByEstagioHandler.execute(accessContext, params.id);
    ensureExists(queryResult, Relatorio.entityName, params.id);
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult!);
  }

  @Post("/")
  @ApiOperation({
    operationId: "estagioRelatorioUploadPdf",
    summary: "Envia o relatório de estágio em formato PDF",
    description: "Faz upload do arquivo PDF do relatório e vincula ao estágio.",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary", description: "Arquivo PDF do relatório" },
      },
      required: ["file"],
    },
  })
  @ApiCreatedResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiBadRequestResponse({ description: "Arquivo não informado ou não é PDF" })
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file", UPLOAD_LIMITS.DOCUMENT))
  async upload(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RelatorioFindOneOutputRestDto> {
    const queryResult = await this.uploadPdfHandler.execute(accessContext, {
      estagioId: params.id,
      file,
    });
    return RelatorioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/upload")
  @ApiOperation({
    operationId: "estagioRelatorioUploadPdfAlias",
    summary: "Envia o relatório de estágio em formato PDF (alias)",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary", description: "Arquivo PDF do relatório" },
      },
      required: ["file"],
    },
  })
  @ApiCreatedResponse({ type: RelatorioFindOneOutputRestDto })
  @ApiBadRequestResponse({ description: "Arquivo não informado ou não é PDF" })
  @ApiForbiddenResponse()
  @UseInterceptors(FileInterceptor("file", UPLOAD_LIMITS.DOCUMENT))
  async uploadAlias(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RelatorioFindOneOutputRestDto> {
    return this.upload(accessContext, params, file);
  }

  @Get("/pdf")
  @ApiOperation(RelatorioGetPdfQueryMetadata.swaggerMetadata)
  @ApiProduces("application/pdf")
  @ApiOkResponse({ description: "Arquivo PDF do relatório" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getPdf(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
  ): Promise<StreamableFile> {
    const queryResult = await this.getPdfHandler.execute(accessContext, params.id);
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType ?? "application/pdf",
      disposition: queryResult.disposition,
    });
  }

  @Get("/download")
  @ApiOperation({
    operationId: "estagioRelatorioDownloadPdf",
    summary: "Download do arquivo PDF do relatório de estágio",
  })
  @ApiProduces("application/pdf")
  @ApiOkResponse({ description: "Arquivo PDF do relatório" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async downloadPdf(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
  ): Promise<StreamableFile> {
    return this.getPdf(accessContext, params);
  }

  @Delete("/")
  @ApiOperation({
    operationId: "estagioRelatorioDelete",
    summary: "Remove o relatório do estágio",
  })
  @ApiOkResponse({ description: "Relatório de estágio removido com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteByEstagio(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: EstagioRelatorioParamsRestDto,
  ): Promise<{ message: string }> {
    const existing = await this.findByEstagioHandler.execute(accessContext, params.id);
    ensureExists(existing, Relatorio.entityName, params.id);
    await this.deleteHandler.execute(accessContext, { id: existing!.id });
    return { message: "Relatório de estágio removido com sucesso" };
  }
}

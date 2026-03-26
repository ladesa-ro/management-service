import { Controller, Get, Param, Query, StreamableFile } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  ArquivoGetStreamableFileQueryMetadata,
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import { AccessContextHttp } from "@/server/nest/access-context";
import { ArquivoFindOneInputRestDto, ArquivoGetFileQueryInputRestDto } from "./arquivo.rest.dto";
import * as ArquivoRestMapper from "./arquivo.rest.mapper";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoRestController {
  constructor(
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  @Get(":id")
  @ApiOperation(ArquivoGetStreamableFileQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ description: "Arquivo encontrado" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getFile(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: ArquivoFindOneInputRestDto,
    @Query() query: ArquivoGetFileQueryInputRestDto,
  ): Promise<StreamableFile> {
    const getFileQuery = ArquivoRestMapper.toGetFileInput.map({ params, query });
    const queryResult = await this.getStreamableFileHandler.execute(accessContext, getFileQuery);
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }
}

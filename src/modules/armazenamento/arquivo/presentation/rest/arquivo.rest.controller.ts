import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import { ArquivoFindOneInputRestDto, ArquivoGetFileQueryInputRestDto } from "./arquivo.rest.dto";
import { ArquivoRestMapper } from "./arquivo.rest.mapper";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get(":id")
  @ApiOperation({ summary: "Busca um arquivo por ID", operationId: "arquivoFindById" })
  @ApiOkResponse({ description: "Arquivo encontrado" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getFile(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ArquivoFindOneInputRestDto,
    @Query() query: ArquivoGetFileQueryInputRestDto,
  ): Promise<StreamableFile> {
    const getStreamableFileHandler = this.container.get<IArquivoGetStreamableFileQueryHandlerType>(
      IArquivoGetStreamableFileQueryHandler,
    );
    const input = ArquivoRestMapper.toGetFileInput(params, query);
    return getStreamableFileHandler.execute(accessContext, input);
  }
}

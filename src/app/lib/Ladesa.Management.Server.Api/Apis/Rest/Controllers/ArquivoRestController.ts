import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  AccessContext,
  AccessContextHttp,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { ArquivoService } from "@/Ladesa.Management.Application/armazenamento/arquivo/application/use-cases/arquivo.service";
import {
  ArquivoFindOneInputRestDto,
  ArquivoGetFileQueryInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/ArquivoRestDto";
import { ArquivoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/ArquivoRestMapper";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoRestController {
  constructor(private arquivoService: ArquivoService) {}

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
    const input = ArquivoRestMapper.toGetFileInput(params, query);
    return this.arquivoService.getStreamableFile(accessContext, input);
  }
}

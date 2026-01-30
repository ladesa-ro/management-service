import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ArquivoService } from "@/core/arquivo/application/use-cases/arquivo.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { ArquivoFindOneInputDto, ArquivoGetFileQueryInputDto } from "./arquivo.rest.dto";
import { ArquivoRestMapper } from "./arquivo.rest.mapper";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoRestController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(":id")
  @ApiOperation({ summary: "Busca um arquivo por ID" })
  @ApiOkResponse({ description: "Arquivo encontrado" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getFile(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ArquivoFindOneInputDto,
    @Query() query: ArquivoGetFileQueryInputDto,
  ): Promise<StreamableFile> {
    const input = ArquivoRestMapper.toGetFileInput(params, query);
    return this.arquivoService.getStreamableFile(accessContext, input);
  }
}

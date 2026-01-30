import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ArquivoFindOneInputDto, ArquivoGetFileQueryInputDto } from "./dto";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoController {
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
    return this.arquivoService.getStreamableFile(accessContext, params.id, {
      id: query["acesso.recurso.id"],
      nome: query["acesso.recurso.nome"],
    });
  }
}

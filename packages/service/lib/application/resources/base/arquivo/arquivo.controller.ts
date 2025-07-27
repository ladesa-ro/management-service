import { Controller, Get, type StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ArquivoService } from "./arquivo.service";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(":id")
  async getFile(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ArquivoGetFile") dto: IAppRequest<"ArquivoGetFile">): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(accessContext, dto.query.id, {
      id: dto.query.acessoRecursoId,
      nome: dto.query.acessoRecursoNome,
    });
  }
}

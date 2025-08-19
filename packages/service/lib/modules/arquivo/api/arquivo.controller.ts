import { Controller, Get, type StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { IAppRequest } from "@/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/contracts/openapi/utils/app-request";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { ArquivoService } from "../domain/arquivo.service";

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

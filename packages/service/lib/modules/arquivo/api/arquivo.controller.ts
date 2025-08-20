import { Controller, Get, type StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppRequest, IAppRequest } from "@/shared";
import { AccessContext, AccessContextHttp } from "@/shared/infrastructure/access-context";
import { ArquivoService } from "../domain/arquivo.service";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(":id")
  async getFile(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ArquivoGetFile") dto: IAppRequest<"ArquivoGetFile">): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(accessContext, dto.params.id, {
      id: dto.query["acesso.recurso.id"],
      nome: dto.query["acesso.recurso.nome"],
    });
  }
}

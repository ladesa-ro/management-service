
import { Controller, Get, Query, type StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ArquivoService } from "./arquivo.service";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) {}

  @Get(":id")
  async getFile(
    @AccessContextHttp() accessContext: AccessContext,
    @Query("acesso.recurso.id") acessoRecursoId: string,
    @Query("acesso.recurso.nome") acessoRecursoNome: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(accessContext, id {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}

import { type AccessContext, AccessContextHttp } from "@/access-context";
import { ArquivoService } from "@ladesa-ro/management-management-service.domain";
import { Controller, Get, Param, Query, type StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocSchema } from "../helpers/documentacao/openapi";
import { RotaDocumentada } from "../helpers/rota-documentada";

@ApiTags("arquivos")
@Controller("/arquivos")
export class ArquivoController {
  constructor(private arquivoService: ArquivoService) { }

  @Get(":id")
  @RotaDocumentada(ApiDocSchema.paths["/api/v1/arquivos/{id}"].get)
  async getFile(
    @AccessContextHttp() accessContext: AccessContext,

    @Param("id") id: string,
    @Query("acesso.recurso.id") acessoRecursoId: string,
    @Query("acesso.recurso.nome") acessoRecursoNome: string,
  ): Promise<StreamableFile> {
    return this.arquivoService.getStreamableFile(accessContext, id, {
      id: acessoRecursoId,
      nome: acessoRecursoNome,
    });
  }
}

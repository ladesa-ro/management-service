import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import {
  type ICursoGetImagemCapaQuery,
  ICursoGetImagemCapaQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../ports";

@Injectable()
export class CursoGetImagemCapaQueryHandlerImpl implements ICursoGetImagemCapaQueryHandler {
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {}

  async execute({ accessContext, id }: ICursoGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Curso", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Curso",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }
}

import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import {
  type ITurmaGetImagemCapaQuery,
  ITurmaGetImagemCapaQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class TurmaGetImagemCapaQueryHandlerImpl implements ITurmaGetImagemCapaQueryHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {}

  async execute({ accessContext, id }: ITurmaGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Turma", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Turma",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }
}

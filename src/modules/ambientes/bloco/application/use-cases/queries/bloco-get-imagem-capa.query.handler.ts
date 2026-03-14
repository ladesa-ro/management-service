import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import {
  type IBlocoGetImagemCapaQuery,
  IBlocoGetImagemCapaQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-get-imagem-capa.query.handler.interface";
import { ArquivoService } from "@/modules/armazenamento/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../ports";

@Injectable()
export class BlocoGetImagemCapaQueryHandlerImpl implements IBlocoGetImagemCapaQueryHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    private readonly imagemService: ImagemService,
    private readonly arquivoService: ArquivoService,
  ) {}

  async execute({ accessContext, id }: IBlocoGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Bloco", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Bloco",
      id,
      this.imagemService,
      this.arquivoService,
    );
  }
}

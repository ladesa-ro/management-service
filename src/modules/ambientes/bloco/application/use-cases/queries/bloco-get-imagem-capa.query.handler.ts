import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import {
  type IBlocoGetImagemCapaQuery,
  IBlocoGetImagemCapaQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-get-imagem-capa.query.handler.interface";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../../domain/repositories";

@Injectable()
export class BlocoGetImagemCapaQueryHandlerImpl implements IBlocoGetImagemCapaQueryHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
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
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

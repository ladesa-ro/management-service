import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import {
  type ITurmaGetImagemCapaQuery,
  ITurmaGetImagemCapaQueryHandler,
} from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";

@Injectable()
export class TurmaGetImagemCapaQueryHandlerImpl implements ITurmaGetImagemCapaQueryHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
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
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

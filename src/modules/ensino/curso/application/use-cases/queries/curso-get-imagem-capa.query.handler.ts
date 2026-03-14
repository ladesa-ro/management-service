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
  type ICursoGetImagemCapaQuery,
  ICursoGetImagemCapaQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../../domain/repositories";

@Injectable()
export class CursoGetImagemCapaQueryHandlerImpl implements ICursoGetImagemCapaQueryHandler {
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
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
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

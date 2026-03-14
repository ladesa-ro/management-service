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
  type IDisciplinaGetImagemCapaQuery,
  IDisciplinaGetImagemCapaQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-get-imagem-capa.query.handler.interface";
import {
  DISCIPLINA_REPOSITORY_PORT,
  type IDisciplinaRepositoryPort,
} from "../../../domain/repositories";

@Injectable()
export class DisciplinaGetImagemCapaQueryHandlerImpl
  implements IDisciplinaGetImagemCapaQueryHandler
{
  constructor(
    @Inject(DISCIPLINA_REPOSITORY_PORT)
    private readonly repository: IDisciplinaRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IDisciplinaGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Disciplina", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Disciplina",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

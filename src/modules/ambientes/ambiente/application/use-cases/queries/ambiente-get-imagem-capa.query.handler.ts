import { Inject, Injectable, type StreamableFile } from "@nestjs/common";
import { getEntityImagemStreamableFile, ResourceNotFoundError } from "@/modules/@shared";
import {
  type IAmbienteGetImagemCapaQuery,
  IAmbienteGetImagemCapaQueryHandler,
} from "@/modules/ambientes/ambiente/domain/queries/ambiente-get-imagem-capa.query.handler.interface";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import {
  AMBIENTE_REPOSITORY_PORT,
  type IAmbienteRepositoryPort,
} from "../../../domain/repositories";

@Injectable()
export class AmbienteGetImagemCapaQueryHandlerImpl implements IAmbienteGetImagemCapaQueryHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
    @Inject(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Inject(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IAmbienteGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    if (!entity) {
      throw new ResourceNotFoundError("Ambiente", id);
    }

    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      "imagemCapa",
      "Imagem de capa do Ambiente",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

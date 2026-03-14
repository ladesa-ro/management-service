import { type StreamableFile } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, getEntityImagemStreamableFile } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
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
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoGetImagemCapaQueryHandlerImpl implements IBlocoGetImagemCapaQueryHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IBlocoGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    ensureExists(entity, Bloco.entityName, id);

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

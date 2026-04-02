import { ensureExists } from "@/application/errors";
import { getEntityImagemStreamableFile } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeGetImagemCapaQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-get-imagem-capa.query.handler.interface";
import type { ModalidadeFindOneQuery } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeGetImagemCapaQueryHandlerImpl
  implements IModalidadeGetImagemCapaQueryHandler
{
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: ModalidadeFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, Modalidade.entityName, id);

    return getEntityImagemStreamableFile(
      entity.imagemCapa,
      "Imagem de capa da Modalidade",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

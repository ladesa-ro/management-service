import { ensureExists } from "@/application/errors";
import { getEntityImagemStreamableFile } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import { IDiarioGetImagemCapaQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-get-imagem-capa.query.handler.interface";
import type { DiarioFindOneQuery } from "../../domain/queries";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioGetImagemCapaQueryHandlerImpl implements IDiarioGetImagemCapaQueryHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @Dep(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: DiarioFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, Diario.entityName, id);

    return getEntityImagemStreamableFile(
      entity.imagemCapa,
      "Imagem de capa do Diário",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

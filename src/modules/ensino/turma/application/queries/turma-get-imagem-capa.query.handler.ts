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
import { ITurmaGetImagemCapaQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import type { TurmaFindOneQuery } from "../../domain/queries";
import { ITurmaRepository } from "../../domain/repositories";

@Impl()
export class TurmaGetImagemCapaQueryHandlerImpl implements ITurmaGetImagemCapaQueryHandler {
  constructor(
    @Dep(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Dep(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: TurmaFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, Turma.entityName, id);

    return getEntityImagemStreamableFile(
      entity.imagemCapa,
      "Imagem de capa do Turma",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

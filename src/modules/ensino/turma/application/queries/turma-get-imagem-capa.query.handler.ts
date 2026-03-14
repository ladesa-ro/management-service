import { type StreamableFile } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, getEntityImagemStreamableFile } from "@/modules/@shared";
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
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaGetImagemCapaQueryHandlerImpl implements ITurmaGetImagemCapaQueryHandler {
  constructor(
    @DeclareDependency(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: ITurmaGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    ensureExists(entity, Turma.entityName, id);

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

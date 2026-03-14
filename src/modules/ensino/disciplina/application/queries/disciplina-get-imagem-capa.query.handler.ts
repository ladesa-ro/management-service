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
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import {
  type IDisciplinaGetImagemCapaQuery,
  IDisciplinaGetImagemCapaQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-get-imagem-capa.query.handler.interface";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaGetImagemCapaQueryHandlerImpl
  implements IDisciplinaGetImagemCapaQueryHandler
{
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute({ accessContext, id }: IDisciplinaGetImagemCapaQuery): Promise<StreamableFile> {
    const entity = await this.repository.findById(accessContext, { id });

    ensureExists(entity, Disciplina.entityName, id);

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

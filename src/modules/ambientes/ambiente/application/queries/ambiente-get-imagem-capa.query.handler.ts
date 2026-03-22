import { ensureExists } from "@/application/errors";
import { getEntityImagemStreamableFile } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteGetImagemCapaQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-get-imagem-capa.query.handler.interface";
import {
  IArquivoGetStreamableFileQueryHandler,
  type IArquivoGetStreamableFileQueryHandler as IArquivoGetStreamableFileQueryHandlerType,
} from "@/modules/armazenamento/arquivo/domain/queries";
import {
  IImagemGetLatestArquivoIdQueryHandler,
  type IImagemGetLatestArquivoIdQueryHandler as IImagemGetLatestArquivoIdQueryHandlerType,
} from "@/modules/armazenamento/imagem/domain/queries";
import type { AmbienteFindOneQuery } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteGetImagemCapaQueryHandlerImpl implements IAmbienteGetImagemCapaQueryHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @DeclareDependency(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @DeclareDependency(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: AmbienteFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.findById(accessContext, { id });

    ensureExists(entity, Ambiente.entityName, id);

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

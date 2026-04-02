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
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import { INivelFormacaoGetImagemCapaQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-get-imagem-capa.query.handler.interface";
import type { NivelFormacaoFindOneQuery } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@Impl()
export class NivelFormacaoGetImagemCapaQueryHandlerImpl
  implements INivelFormacaoGetImagemCapaQueryHandler
{
  constructor(
    @Dep(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @Dep(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: NivelFormacaoFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, NivelFormacao.entityName, id);

    return getEntityImagemStreamableFile(
      entity.imagemCapa,
      "Imagem de capa do NivelFormacao",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

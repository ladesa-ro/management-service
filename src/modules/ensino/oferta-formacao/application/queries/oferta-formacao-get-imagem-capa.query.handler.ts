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
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoGetImagemCapaQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-get-imagem-capa.query.handler.interface";
import type { OfertaFormacaoFindOneQuery } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@Impl()
export class OfertaFormacaoGetImagemCapaQueryHandlerImpl
  implements IOfertaFormacaoGetImagemCapaQueryHandler
{
  constructor(
    @Dep(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @Dep(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: OfertaFormacaoFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, OfertaFormacao.entityName, id);

    return getEntityImagemStreamableFile(
      entity.imagemCapa,
      "Imagem de capa da Oferta de Formacao",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

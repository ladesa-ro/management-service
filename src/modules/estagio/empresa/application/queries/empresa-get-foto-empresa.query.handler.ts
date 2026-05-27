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
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import { IEmpresaGetFotoEmpresaQueryHandler } from "@/modules/estagio/empresa/domain/queries/empresa-get-foto-empresa.query.handler.interface";
import type { EmpresaFindOneQuery } from "../../domain/queries";
import { IEmpresaRepository } from "../../domain/repositories";

@Impl()
export class EmpresaGetFotoEmpresaQueryHandlerImpl implements IEmpresaGetFotoEmpresaQueryHandler {
  constructor(
    @Dep(IEmpresaRepository)
    private readonly repository: IEmpresaRepository,
    @Dep(IImagemGetLatestArquivoIdQueryHandler)
    private readonly getLatestArquivoIdHandler: IImagemGetLatestArquivoIdQueryHandlerType,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly getStreamableFileHandler: IArquivoGetStreamableFileQueryHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: EmpresaFindOneQuery,
  ): Promise<IStreamableFileResult> {
    const entity = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(entity, Empresa.entityName, id);

    return getEntityImagemStreamableFile(
      entity.fotoEmpresa,
      "Foto da Empresa",
      id,
      this.getLatestArquivoIdHandler,
      this.getStreamableFileHandler,
    );
  }
}

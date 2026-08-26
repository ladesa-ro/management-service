import { NotFoundException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IArquivoGetStreamableFileQueryHandler } from "@/modules/armazenamento/arquivo/domain/queries";
import { IRelatorioGetPdfQueryHandler } from "../../domain/queries/relatorio-get-pdf.query.handler.interface";
import { Relatorio } from "../../domain/relatorio";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioGetPdfQueryHandlerImpl implements IRelatorioGetPdfQueryHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
    @Dep(IArquivoGetStreamableFileQueryHandler)
    private readonly arquivoGetStreamableFileHandler: IArquivoGetStreamableFileQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    estagioId: string,
  ): Promise<IStreamableFileResult> {
    const relatorio = await this.repository.findByEstagioId(estagioId);
    ensureExists(relatorio, Relatorio.entityName, estagioId);

    if (!relatorio.arquivo?.id) {
      throw new NotFoundException("O estágio não possui arquivo PDF de relatório enviado.");
    }

    return this.arquivoGetStreamableFileHandler.execute(accessContext, {
      id: relatorio.arquivo.id,
    });
  }
}

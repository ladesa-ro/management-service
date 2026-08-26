import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IArquivoCreateCommandHandler } from "@/modules/armazenamento/arquivo/domain/commands";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type {
  IRelatorioUploadPdfCommandHandler,
  RelatorioUploadPdfInput,
} from "../../domain/commands/relatorio-upload-pdf.command.handler.interface";
import type { RelatorioFindOneQueryResult } from "../../domain/queries";
import { Relatorio } from "../../domain/relatorio";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioUploadPdfCommandHandlerImpl implements IRelatorioUploadPdfCommandHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
    @Dep(IArquivoCreateCommandHandler)
    private readonly arquivoCreateHandler: IArquivoCreateCommandHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    input: RelatorioUploadPdfInput,
  ): Promise<RelatorioFindOneQueryResult> {
    const { estagioId, file, conteudoJson } = input;

    if (!file?.buffer) {
      throw new BadRequestException("Arquivo PDF não informado.");
    }

    const isPdf =
      file.mimetype === "application/pdf" || file.originalname?.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      throw new BadRequestException("O arquivo enviado deve ser do tipo PDF.");
    }

    // 1. Carregar e garantir existência do estágio
    const estagio = await this.estagioRepository.loadById(accessContext, estagioId);
    ensureExists(estagio, "Estagio", estagioId);

    // 2. Salvar arquivo PDF no storage
    const createdArquivo = await this.arquivoCreateHandler.execute(accessContext, {
      dto: {
        name: file.originalname || `relatorio-estagio-${estagioId}.pdf`,
        mimeType: "application/pdf",
      },
      data: file.buffer,
    });

    // 3. Upsert do relatório vinculado ao estágio
    const existing = await this.repository.findByEstagioId(estagioId);

    if (existing) {
      existing.update(conteudoJson ?? existing.conteudoJson, { id: createdArquivo.id });
      await this.repository.save(existing);
      const result = await this.repository.getFindOneQueryResult(accessContext, {
        id: existing.id,
      });
      ensureExists(result, Relatorio.entityName, existing.id);
      return result!;
    }

    const relatorio = Relatorio.create({
      estagio: { id: estagioId },
      arquivo: { id: createdArquivo.id },
      conteudoJson: conteudoJson ?? null,
    });
    await this.repository.save(relatorio);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: relatorio.id });
    ensureExists(result, Relatorio.entityName, relatorio.id);
    return result!;
  }
}

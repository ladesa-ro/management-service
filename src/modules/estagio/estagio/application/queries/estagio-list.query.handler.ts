import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioListQueryHandler } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.handler.interface";
import type { EstagioListQuery, EstagioListQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioListQueryHandlerImpl implements IEstagioListQueryHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioListQuery | null,
  ): Promise<EstagioListQueryResult> {
    if (dto && dto.filterSituacao && dto.filterSituacao.length > 0) {
      const isCompleto = dto.filterSituacao.includes("COMPLETO");
      const isOcupado = dto.filterSituacao.includes("OCUPADO");
      const isDisponivel = dto.filterSituacao.includes("DISPONIVEL");

      // We mutate the any version of dto to add filter strings parsed by extractFilters
      const anyDto = dto as any;

      if (isCompleto) {
        anyDto["filter.status"] = anyDto["filter.status"] || [];
        if (Array.isArray(anyDto["filter.status"])) {
          anyDto["filter.status"].push("ENCERRADO");
        } else {
          anyDto["filter.status"] = [anyDto["filter.status"], "ENCERRADO"];
        }
      }

      if (isOcupado) {
        anyDto["filter.estagiario.id"] = anyDto["filter.estagiario.id"] || [];
        if (Array.isArray(anyDto["filter.estagiario.id"])) {
          anyDto["filter.estagiario.id"].push("$notnull");
        } else {
          anyDto["filter.estagiario.id"] = [anyDto["filter.estagiario.id"], "$notnull"];
        }
      }

      if (isDisponivel) {
        anyDto["filter.estagiario.id"] = anyDto["filter.estagiario.id"] || [];
        if (Array.isArray(anyDto["filter.estagiario.id"])) {
          anyDto["filter.estagiario.id"].push("$null");
        } else {
          anyDto["filter.estagiario.id"] = [anyDto["filter.estagiario.id"], "$null"];
        }
      }
    }

    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}

import { createMapper } from "@/shared/mapping";
import type { RelatorioFindOneQueryResult } from "../../domain/queries";
import { Relatorio } from "../../domain/relatorio";
import { RelatorioTypeormEntity } from "./relatorio.typeorm.entity";

const formatDate = (date: string | Date | null | undefined): string | null => {
  if (!date) return null;
  return date instanceof Date ? date.toISOString() : (date as string);
};

export const RelatorioTypeormMapper = {
  domainToPersistence: createMapper<Relatorio, RelatorioTypeormEntity>((domain) => {
    const entity = new RelatorioTypeormEntity();
    entity.id = domain.id;
    entity.estagio = { id: domain.estagio.id } as any;
    entity.estagioId = domain.estagio.id;
    entity.arquivo = domain.arquivo ? ({ id: domain.arquivo.id } as any) : null;
    entity.arquivoId = domain.arquivo?.id ?? null;
    entity.conteudoJson = domain.conteudoJson;
    entity.dateCreated = domain.dateCreated;
    entity.dateUpdated = domain.dateUpdated;
    entity.dateDeleted = domain.dateDeleted;
    return entity;
  }),

  entityToDomain: createMapper<RelatorioTypeormEntity, Relatorio>((entity) => {
    return Relatorio.load({
      id: entity.id,
      estagio: { id: entity.estagio?.id ?? entity.estagioId },
      arquivo:
        entity.arquivo?.id || entity.arquivoId
          ? { id: entity.arquivo?.id ?? entity.arquivoId! }
          : null,
      conteudoJson: entity.conteudoJson,
      dateCreated: formatDate(entity.dateCreated) as string,
      dateUpdated: formatDate(entity.dateUpdated) as string,
      dateDeleted: formatDate(entity.dateDeleted),
    });
  }),

  entityToFindOneQueryResult: createMapper<RelatorioTypeormEntity, RelatorioFindOneQueryResult>(
    (entity) => {
      const arquivoObj = entity.arquivo;
      return {
        id: entity.id,
        estagio: { id: entity.estagio?.id ?? entity.estagioId },
        arquivo:
          arquivoObj || entity.arquivoId
            ? {
                id: arquivoObj?.id ?? entity.arquivoId!,
                name: arquivoObj?.name ?? null,
                mimeType: arquivoObj?.mimeType ?? null,
                sizeBytes: arquivoObj?.sizeBytes ?? null,
              }
            : null,
        conteudoJson: entity.conteudoJson,
        dateCreated: formatDate(entity.dateCreated) as string,
        dateUpdated: formatDate(entity.dateUpdated) as string,
        dateDeleted: formatDate(entity.dateDeleted),
      };
    },
  ),
};

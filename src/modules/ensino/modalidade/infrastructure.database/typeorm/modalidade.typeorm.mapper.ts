import type { IModalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.result";
import { createMapper, into } from "@/shared/mapping";
import type { ModalidadeEntity } from "./modalidade.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<ModalidadeEntity, IModalidade>((entity) => {
  const domain = {} as IModalidade;
  into(domain)
    .from(entity)
    .field("id")
    .field("nome")
    .field("slug")
    .field("dateCreated")
    .field("dateUpdated")
    .field("dateDeleted");
  return domain;
});

export const entityToFindOneQueryResult = createMapper<
  ModalidadeEntity,
  ModalidadeFindOneQueryResult
>((entity) => {
  const queryResult = new ModalidadeFindOneQueryResult();
  into(queryResult)
    .from(entity)
    .field("id")
    .field("nome")
    .field("slug")
    .field("dateCreated")
    .field("dateUpdated")
    .field("dateDeleted");
  return queryResult;
});

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IModalidade, Partial<ModalidadeEntity>>(
  (domain) => {
    const entity: Partial<ModalidadeEntity> = {};

    into(entity)
      .from(domain)
      .field("id")
      .field("nome")
      .field("slug")
      .field("dateCreated")
      .field("dateUpdated")
      .field("dateDeleted");
    return entity;
  },
);

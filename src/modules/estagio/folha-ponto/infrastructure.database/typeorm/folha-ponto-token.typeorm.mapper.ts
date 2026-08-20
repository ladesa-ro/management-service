import { createMapper } from "@/shared/mapping";
import { FolhaPontoToken } from "../../domain/folha-ponto-token";
import { FolhaPontoTokenTypeormEntity } from "./folha-ponto-token.typeorm.entity";

export const FolhaPontoTokenTypeormMapper = {
  domainToPersistence: createMapper<FolhaPontoToken, FolhaPontoTokenTypeormEntity>((domain) => {
    const entity = new FolhaPontoTokenTypeormEntity();
    entity.id = domain.id;
    entity.folhaPonto = { id: domain.folhaPonto.id } as any;
    entity.tipo = domain.tipo;
    entity.expiresAt = domain.expiresAt;
    entity.usedAt = domain.usedAt;
    entity.ipAddress = domain.ipAddress;
    entity.userAgent = domain.userAgent;
    entity.dateCreated = domain.dateCreated;
    return entity;
  }),

  entityToDomain: createMapper<FolhaPontoTokenTypeormEntity, FolhaPontoToken>((entity) => {
    return FolhaPontoToken.load({
      id: entity.id,
      folhaPonto: { id: entity.folhaPonto?.id ?? entity.folhaPontoId },
      tipo: entity.tipo as any,
      expiresAt: entity.expiresAt,
      usedAt: entity.usedAt,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      dateCreated: entity.dateCreated,
    });
  }),
};

import type { DeepPartial } from "typeorm";
import type { IPerfil } from "@/modules/acesso/usuario/perfil/domain/perfil";
import type { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { PerfilEntity } from "./perfil.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain)
// ============================================================================

export const entityToDomain = createMapper<PerfilEntity, IPerfil>((e) => ({
  id: e.id,
  ativo: e.ativo,
  cargo: e.cargo?.nome ?? "",
  campus: pickId(e.campus),
  usuario: pickId(e.usuario),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<PerfilEntity, PerfilFindOneQueryResult>(
  (e) => ({
    id: e.id,
    ativo: e.ativo,
    cargo: e.cargo,
    campus: e.campus,
    usuario: e.usuario,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IPerfil, DeepPartial<PerfilEntity>>((d) => ({
  id: d.id,
  ativo: d.ativo,
  cargo: { nome: d.cargo },
  campus: pickId(d.campus),
  usuario: pickId(d.usuario),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));

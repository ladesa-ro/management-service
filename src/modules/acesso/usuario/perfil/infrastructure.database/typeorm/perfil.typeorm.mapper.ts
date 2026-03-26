import type { DeepPartial } from "typeorm";
import type { IPerfil } from "@/modules/acesso/usuario/perfil/domain/perfil";
import { createMapper, pickId } from "@/shared/mapping";
import type { PerfilEntity } from "./perfil.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain)
// ============================================================================

export const entityToDomain = createMapper<PerfilEntity, IPerfil>((e) => ({
  id: e.id,
  ativo: e.ativo,
  cargo: e.cargo?.nome ?? "",
  campus: e.campus as unknown as IPerfil["campus"],
  usuario: e.usuario as unknown as IPerfil["usuario"],
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IPerfil, DeepPartial<PerfilEntity>>((d) => ({
  id: d.id,
  ativo: d.ativo,
  cargo: d.cargo as unknown as DeepPartial<PerfilEntity>["cargo"],
  campus: pickId(d.campus),
  usuario: pickId(d.usuario),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));

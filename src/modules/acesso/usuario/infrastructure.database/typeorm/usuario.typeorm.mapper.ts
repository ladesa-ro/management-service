import type { DeepPartial } from "typeorm";
import type { IUsuario } from "@/modules/acesso/usuario/domain/usuario";
import { createMapper, pickId } from "@/shared/mapping";
import type { UsuarioEntity } from "./usuario.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain)
// ============================================================================

export const entityToDomain = createMapper<UsuarioEntity, IUsuario>((e) => ({
  id: e.id,
  nome: e.nome,
  matricula: e.matricula,
  email: e.email,
  isSuperUser: e.isSuperUser,
  imagemCapa: e.imagemCapa,
  imagemPerfil: e.imagemPerfil,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IUsuario, DeepPartial<UsuarioEntity>>((d) => ({
  id: d.id,
  nome: d.nome,
  matricula: d.matricula,
  email: d.email,
  isSuperUser: d.isSuperUser,
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  imagemPerfil: d.imagemPerfil ? pickId(d.imagemPerfil) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));

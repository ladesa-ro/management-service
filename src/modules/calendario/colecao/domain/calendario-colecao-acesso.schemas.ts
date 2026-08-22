/**
 * Calendario Colecao Acesso — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  CalendarioColecaoAcessoEscopoSchema,
  CalendarioColecaoAcessoFields,
  CalendarioColecaoAcessoPapelSchema,
} from "./calendario-colecao-acesso.fields";
import { CalendarioColecaoAcessoEscopo } from "./calendario-colecao-acesso.types";

// ============================================================================
// Regra: o alvo (usuario/campus) preenchido deve corresponder exatamente ao
// escopo — redundante de propósito com o CHECK da migração.
// ============================================================================

function escopoAlvoConsistente(data: { escopo?: string; usuario?: unknown; campus?: unknown }) {
  const temUsuario = data.usuario !== undefined && data.usuario !== null;
  const temCampus = data.campus !== undefined && data.campus !== null;

  if (data.escopo === CalendarioColecaoAcessoEscopo.USUARIO) return temUsuario && !temCampus;
  if (data.escopo === CalendarioColecaoAcessoEscopo.CAMPUS) return temCampus && !temUsuario;
  if (data.escopo === CalendarioColecaoAcessoEscopo.PUBLICO) return !temUsuario && !temCampus;
  return true;
}

const ESCOPO_ALVO_INCONSISTENTE_MESSAGE = {
  message:
    "o alvo do acesso deve corresponder exatamente ao escopo: USUARIO exige usuario (e não campus), CAMPUS exige campus (e não usuario), PUBLICO não aceita nenhum dos dois",
  path: ["escopo"],
};

// ============================================================================
// Schema completo do aggregate (para load)
// ============================================================================

export const CalendarioColecaoAcessoSchema = z
  .object({
    id: uuidSchema,
    colecao: ObjectIdUuidFactory.domain,
    escopo: CalendarioColecaoAcessoEscopoSchema,
    usuario: ObjectIdUuidFactoryNullable.domain,
    campus: ObjectIdUuidFactoryNullable.domain,
    papel: CalendarioColecaoAcessoPapelSchema,
  })
  .extend(datedSchema.shape)
  .refine(escopoAlvoConsistente, ESCOPO_ALVO_INCONSISTENTE_MESSAGE);

// ============================================================================
// Create
// ============================================================================

export const CalendarioColecaoAcessoCreateSchema = createSchema((standard) =>
  z
    .object({
      // Opcional de propósito: nunca vem do corpo da requisição REST — a application
      // layer sempre injeta o id da coleção (obtido do path param) antes de chamar
      // CalendarioColecaoAcesso.create(). Presente aqui só para o zodValidate interno
      // não rejeitar a chave quando o handler a envia.
      colecao: ObjectIdUuidFactory.create(standard).optional(),
      escopo: CalendarioColecaoAcessoFields.escopo.create(standard),
      usuario: ObjectIdUuidFactoryNullable.create(standard).optional(),
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      papel: CalendarioColecaoAcessoFields.papel.create(standard),
    })
    .refine(escopoAlvoConsistente, ESCOPO_ALVO_INCONSISTENTE_MESSAGE),
);

// Sem schema de update de propósito: uma concessão é criada ou revogada, nunca
// editada — trocar o papel exige revogar e conceder novamente (ver AGENTS/checkpoint).

/**
 * Calendario Colecao — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  CalendarioColecaoFields,
  CalendarioColecaoVisibilidadeSchema,
} from "./calendario-colecao.fields";
import { CalendarioColecaoVisibilidade } from "./calendario-colecao.types";

// ============================================================================
// Regra: visibilidade CAMPUS exige campus preenchido.
// Redundante de propósito com o CHECK da migração — mesmo padrão já usado em
// dataFim >= dataInicio de calendario_agendamento.
// ============================================================================

function camposConsistentes(data: { visibilidade?: string; campus?: unknown }) {
  if (data.visibilidade === CalendarioColecaoVisibilidade.CAMPUS) {
    return data.campus !== undefined && data.campus !== null;
  }
  return true;
}

const CAMPUS_OBRIGATORIO_MESSAGE = {
  message: "campus é obrigatório quando visibilidade é CAMPUS",
  path: ["campus"],
};

// ============================================================================
// Schema completo do aggregate (para load)
// ============================================================================

export const CalendarioColecaoSchema = z
  .object({
    id: uuidSchema,
    dono: ObjectIdUuidFactory.domain,
    campus: ObjectIdUuidFactoryNullable.domain,
    nome: CalendarioColecaoFields.nome.domainSchema,
    cor: CalendarioColecaoFields.cor.domainSchema,
    visibilidade: CalendarioColecaoVisibilidadeSchema,
  })
  .extend(datedSchema.shape)
  .refine(camposConsistentes, CAMPUS_OBRIGATORIO_MESSAGE);

// ============================================================================
// Create
// ============================================================================

export const CalendarioColecaoCreateSchema = createSchema((standard) =>
  z
    .object({
      // Opcional de propósito: nunca vem do corpo da requisição REST (o DTO de
      // entrada não tem esse campo) — a application layer sempre injeta o usuário
      // autenticado antes de chamar CalendarioColecao.create(). Presente aqui só
      // para o zodValidate interno não rejeitar a chave quando o handler a envia.
      dono: ObjectIdUuidFactory.create(standard).optional(),
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      nome: CalendarioColecaoFields.nome.create(standard),
      cor: CalendarioColecaoFields.cor.create(standard).optional(),
      visibilidade: CalendarioColecaoFields.visibilidade
        .create(standard)
        .optional()
        .default(CalendarioColecaoVisibilidade.PRIVADA),
    })
    .refine(camposConsistentes, CAMPUS_OBRIGATORIO_MESSAGE),
);

// ============================================================================
// Update
// ============================================================================

export const CalendarioColecaoUpdateSchema = createSchema(
  (standard) =>
    z.object({
      campus: ObjectIdUuidFactoryNullable.create(standard).optional(),
      nome: CalendarioColecaoFields.nome.create(standard).optional(),
      cor: CalendarioColecaoFields.cor.create(standard).optional(),
      visibilidade: CalendarioColecaoFields.visibilidade.create(standard).optional(),
    }),
  // Sem .refine() aqui de propósito: um update parcial só manda visibilidade OU só
  // campus é legítimo quando o outro já está salvo. A consistência do estado final
  // (visibilidade CAMPUS ⇒ campus não nulo) é responsabilidade de
  // CalendarioColecao.update(), que valida depois de mesclar com o agregado carregado.
);

// ============================================================================
// Transferir dono
// ============================================================================

export const CalendarioColecaoTransferirDonoSchema = createSchema((standard) =>
  z.object({
    novoDonoId: CalendarioColecaoFields.novoDonoId.create(standard),
  }),
);

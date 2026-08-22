/**
 * Calendario Colecao — definicao dos campos (FieldMetadata) da entidade.
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";
import { CalendarioColecaoVisibilidade } from "./calendario-colecao.types";

export const CALENDARIO_COLECAO_CORES_PERMITIDAS = [
  "#2f9e41",
  "#1e5dcc",
  "#cd191e",
  "#b8a003",
  "#5300a6",
  "#e85d04",
  "#0d9488",
  "#db2777",
  "#6366f1",
  "#78716c",
] as const;

const corSchema = z
  .string()
  .refine((val) => CALENDARIO_COLECAO_CORES_PERMITIDAS.some((c) => c === val), {
    message: `A cor deve ser uma das seguintes: ${CALENDARIO_COLECAO_CORES_PERMITIDAS.join(", ")}`,
  });

export const CalendarioColecaoVisibilidadeValues = ["PRIVADA", "CAMPUS", "PUBLICA"] as const;

export const CalendarioColecaoVisibilidadeSchema = z.enum(CalendarioColecaoVisibilidadeValues);

export const CalendarioColecaoFields = {
  nome: createFieldMetadata({
    description: "Nome da coleção",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  cor: createFieldMetadata({
    description: "Cor da coleção para exibição",
    nullable: true,
    schema: createSchema(() => corSchema.nullable()),
  }),
  campus: createFieldMetadata({
    description: "Campus da coleção. Obrigatório quando visibilidade é CAMPUS; opcional nas demais",
    nullable: true,
  }),
  visibilidade: createFieldMetadata({
    description:
      "PRIVADA (só dono e concessões explícitas), CAMPUS (todo perfil ativo no campus) ou PUBLICA (toda a instituição)",
    schema: createSchema(() => CalendarioColecaoVisibilidadeSchema),
    defaultValue: CalendarioColecaoVisibilidade.PRIVADA,
  }),
  novoDonoId: createFieldMetadata({
    description: "ID do usuário que se tornará o novo dono da coleção",
    schema: createSchema(() => z.string().uuid()),
  }),
};

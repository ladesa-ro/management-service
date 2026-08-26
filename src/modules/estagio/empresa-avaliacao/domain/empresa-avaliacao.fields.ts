import { z } from "zod";
import { createFieldMetadata, createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";

export const EmpresaAvaliacaoFields = {
  empresa: createFieldMetadata({
    description: "Identificador da empresa avaliada",
    schema: ObjectIdUuidFactory,
  }),
  estagiario: createFieldMetadata({
    description: "Identificador do estagiário autor da avaliação",
    schema: ObjectIdUuidFactory,
  }),
  rating: createFieldMetadata({
    description: "Nota atribuída à empresa, de 1 a 5 estrelas",
    schema: createSchema(() =>
      z
        .number()
        .int("Nota deve ser um número inteiro")
        .min(1, "Nota mínima é 1 estrela")
        .max(5, "Nota máxima é 5 estrelas"),
    ),
  }),
  comentario: createFieldMetadata({
    description: "Comentário detalhado sobre a experiência na empresa (até 2.000 caracteres)",
    schema: createSchema(() =>
      z.string().max(2000, "Comentário não pode exceder 2.000 caracteres").nullable().optional(),
    ),
  }),
  relevanceScore: createFieldMetadata({
    description: "Score de relevância calculado para o comentário",
    schema: createSchema(() => z.number().min(0)),
  }),
  likesCount: createFieldMetadata({
    description: "Quantidade total de curtidas recebidas",
    schema: createSchema(() => z.number().int().min(0)),
  }),
};

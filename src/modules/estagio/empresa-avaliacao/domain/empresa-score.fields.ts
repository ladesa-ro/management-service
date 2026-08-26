import { z } from "zod";
import { createFieldMetadata, createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";

export const EmpresaScoreFields = {
  empresa: createFieldMetadata({
    description: "Identificador da empresa",
    schema: ObjectIdUuidFactory,
  }),
  score: createFieldMetadata({
    description: "Score normalizado da empresa (0 a 100)",
    schema: createSchema(() => z.number().min(0).max(100)),
  }),
  averageRating: createFieldMetadata({
    description: "Média simples das notas de 1 a 5 estrelas",
    schema: createSchema(() => z.number().min(0).max(5)),
  }),
  totalReviews: createFieldMetadata({
    description: "Total de avaliações ativas contabilizadas",
    schema: createSchema(() => z.number().int().min(0)),
  }),
  distribution: createFieldMetadata({
    description: "Distribuição das notas por estrelas",
    schema: createSchema(() =>
      z.object({
        1: z.number().int().min(0),
        2: z.number().int().min(0),
        3: z.number().int().min(0),
        4: z.number().int().min(0),
        5: z.number().int().min(0),
      }),
    ),
  }),
  scoreVersion: createFieldMetadata({
    description: "Versão do algoritmo de cálculo do score",
    schema: createSchema(() => z.number().int().min(1)),
  }),
  calculatedAt: createFieldMetadata({
    description: "Data/hora do último cálculo",
    schema: createSchema(() => z.string().datetime()),
  }),
};

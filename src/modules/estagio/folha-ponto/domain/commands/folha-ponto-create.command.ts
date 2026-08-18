import { z } from "zod";
import { createOperationMetadata } from "@/domain/abstractions";
import { FolhaPontoCreateSchema } from "../folha-ponto.schemas";

export const FolhaPontoCreateCommandMetadata = createOperationMetadata({
  operationId: "folhaPontoCreate",
  summary: "Cria uma nova folha de ponto para um estágio.",
});

export type FolhaPontoCreateCommand = z.infer<typeof FolhaPontoCreateSchema>;

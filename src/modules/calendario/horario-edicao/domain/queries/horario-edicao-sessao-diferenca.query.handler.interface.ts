import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { HorarioEdicaoSessaoDiferencaQuery } from "./horario-edicao-sessao-diferenca.query";
import type { HorarioEdicaoSessaoDiferencaQueryResult } from "./horario-edicao-sessao-diferenca.query.result";

export const HorarioEdicaoSessaoDiferencaQueryMetadata = createOperationMetadata({
  operationId: "horarioEdicaoSessaoDiferenca",
  summary: "Compara o que uma sessao de edicao propoe com o estado atual da agenda",
});

export const IHorarioEdicaoSessaoDiferencaQueryHandler = Symbol(
  "IHorarioEdicaoSessaoDiferencaQueryHandler",
);

export type IHorarioEdicaoSessaoDiferencaQueryHandler = IQueryHandler<
  HorarioEdicaoSessaoDiferencaQuery,
  HorarioEdicaoSessaoDiferencaQueryResult
>;

import type { ICommandHandler } from "@/domain/abstractions";
import type { IHorarioEdicaoSessao } from "../horario-edicao.types";
import type { HorarioEdicaoSessaoDesfazerMudancaCommand } from "./horario-edicao-sessao-desfazer-mudanca.command";

export const IHorarioEdicaoSessaoDesfazerMudancaCommandHandler = Symbol(
  "IHorarioEdicaoSessaoDesfazerMudancaCommandHandler",
);

export type IHorarioEdicaoSessaoDesfazerMudancaCommandHandler = ICommandHandler<
  HorarioEdicaoSessaoDesfazerMudancaCommand,
  IHorarioEdicaoSessao
>;

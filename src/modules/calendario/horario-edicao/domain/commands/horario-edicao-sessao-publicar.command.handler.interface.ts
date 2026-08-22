import type { ICommandHandler } from "@/domain/abstractions";
import type { IHorarioEdicaoSessao } from "../horario-edicao.types";
import type { HorarioEdicaoSessaoPublicarCommand } from "./horario-edicao-sessao-publicar.command";

export const IHorarioEdicaoSessaoPublicarCommandHandler = Symbol(
  "IHorarioEdicaoSessaoPublicarCommandHandler",
);

export type IHorarioEdicaoSessaoPublicarCommandHandler = ICommandHandler<
  HorarioEdicaoSessaoPublicarCommand,
  IHorarioEdicaoSessao
>;

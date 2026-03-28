import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { HorariosDeAulaFindAtualQueryResult } from "../queries";
import type { HorariosDeAulaReplaceCommand } from "./horarios-de-aula-replace.command";

export const HorariosDeAulaReplaceCommandMetadata = createOperationMetadata({
  operationId: "horariosDeAulaReplace",
  summary: "Substitui os horarios de aula de um campus",
});

export const IHorariosDeAulaReplaceCommandHandler = Symbol("IHorariosDeAulaReplaceCommandHandler");

export type IHorariosDeAulaReplaceCommandHandler = ICommandHandler<
  HorariosDeAulaReplaceCommand,
  HorariosDeAulaFindAtualQueryResult
>;

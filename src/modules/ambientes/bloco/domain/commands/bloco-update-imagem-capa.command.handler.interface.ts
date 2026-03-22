import type { ICommandHandler } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export type BlocoUpdateImagemCapaCommand = {
  dto: BlocoFindOneQuery;
  file: Express.Multer.File;
};

export const IBlocoUpdateImagemCapaCommandHandler = Symbol("IBlocoUpdateImagemCapaCommandHandler");

export type IBlocoUpdateImagemCapaCommandHandler = ICommandHandler<
  BlocoUpdateImagemCapaCommand,
  boolean
>;

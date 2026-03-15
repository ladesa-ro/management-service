import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";

export type BlocoUpdateImagemCapaCommand = {
  dto: BlocoFindOneQuery;
  file: Express.Multer.File;
};

export type IBlocoUpdateImagemCapaCommandHandler = ICommandHandler<
  BlocoUpdateImagemCapaCommand,
  boolean
>;
export const IBlocoUpdateImagemCapaCommandHandler = Symbol("IBlocoUpdateImagemCapaCommandHandler");

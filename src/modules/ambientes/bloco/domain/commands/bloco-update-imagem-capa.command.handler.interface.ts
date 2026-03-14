import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneQuery } from "../queries";
export type IBlocoUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: BlocoFindOneQuery;
  file: Express.Multer.File;
};

export type IBlocoUpdateImagemCapaCommandHandler = ICommandHandler<
  IBlocoUpdateImagemCapaCommand,
  boolean
>;
export const IBlocoUpdateImagemCapaCommandHandler = Symbol("IBlocoUpdateImagemCapaCommandHandler");

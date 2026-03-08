import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";

export interface IDisciplinaGetImagemCapaQueryHandler {
  execute(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;
}

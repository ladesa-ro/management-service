import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";

export interface ITurmaGetImagemCapaQueryHandler {
  execute(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;
}

import { UsuarioInputRef } from "@/modules/acesso/usuario";
import type { VinculoInput } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";

export class PerfilDefinirPerfisAtivosCommand {
  vinculos!: VinculoInput[];
  usuario!: UsuarioInputRef;
}

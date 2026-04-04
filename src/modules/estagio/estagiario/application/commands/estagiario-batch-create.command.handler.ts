import { ValidationError } from "@/application/errors/application.error";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import type { EstagiarioCreateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { IEstagiarioCreateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command.handler.interface";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import type { EstagiarioBatchCreateCommand } from "../../domain/commands/estagiario-batch-create.command";
import { IEstagiarioBatchCreateCommandHandler } from "../../domain/commands/estagiario-batch-create.command.handler.interface";

@Impl()
export class EstagiarioBatchCreateCommandHandlerImpl
  implements IEstagiarioBatchCreateCommandHandler
{
  constructor(
    @Dep(IUsuarioCreateCommandHandler)
    private readonly usuarioCreateHandler: IUsuarioCreateCommandHandler,
    @Dep(IEstagiarioCreateCommandHandler)
    private readonly estagiarioCreateHandler: IEstagiarioCreateCommandHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagiarioBatchCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult[]> {
    const results: EstagiarioFindOneQueryResult[] = [];

    for (let index = 0; index < dto.estagiarios.length; index++) {
      const item = dto.estagiarios[index];

      if (!item.usuario.vinculos || item.usuario.vinculos.length === 0) {
        throw ValidationError.fromField(
          `estagiarios[${index}].usuario.vinculos`,
          "Informe ao menos um vínculo para criação do perfil do usuário.",
        );
      }

      const usuario = await this.usuarioCreateHandler.execute(accessContext, {
        nome: item.usuario.nome,
        matricula: item.usuario.matricula,
        email: item.usuario.email,
        vinculos: item.usuario.vinculos,
      });

      const perfil = usuario.vinculos[0];

      if (!perfil?.id) {
        throw ValidationError.fromField(
          `estagiarios[${index}].usuario.vinculos`,
          "Não foi possível identificar o perfil criado para o usuário.",
        );
      }

      const estagiarioCommand: EstagiarioCreateCommand = {
        perfil: { id: perfil.id },
        curso: { id: item.curso.id },
        turma: { id: item.turma.id },
        telefone: item.telefone,
        emailInstitucional: item.emailInstitucional,
        dataNascimento: item.dataNascimento,
      };

      const estagiario = await this.estagiarioCreateHandler.execute(
        accessContext,
        estagiarioCommand,
      );
      results.push(estagiario);
    }

    return results;
  }
}

import { ForbiddenException, HttpException, ServiceUnavailableException } from "@nestjs/common";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { KeycloakService } from "@/modules/@seguranca/provedor-identidade";
import {
  type IAutenticacaoDefinirSenhaCommand,
  IAutenticacaoDefinirSenhaCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-definir-senha.command.handler.interface";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";

@DeclareImplementation()
export class AutenticacaoDefinirSenhaCommandHandlerImpl
  implements IAutenticacaoDefinirSenhaCommandHandler
{
  constructor(
    @DeclareDependency(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    private readonly keycloakService: KeycloakService,
  ) {}

  async execute({ dto }: IAutenticacaoDefinirSenhaCommand): Promise<boolean> {
    try {
      const kcAdminClient = await this.keycloakService.getAdminClient();

      const { usuario, userRepresentation } = await this.findByMatricula(dto.matricula);

      if (!usuario || !userRepresentation) {
        throw new ForbiddenException("Usuário indisponível.");
      }

      const userCredentials = await kcAdminClient.users.getCredentials({
        id: userRepresentation.id!,
      });

      if (
        userRepresentation.requiredActions?.includes("UPDATE_PASSWORD") &&
        userCredentials.length === 0
      ) {
        await kcAdminClient.users.resetPassword({
          id: userRepresentation.id!,
          credential: {
            type: "password",
            temporary: false,
            value: dto.senha,
          },
        });
        await kcAdminClient.users.update(
          {
            id: userRepresentation.id!,
          },
          {
            enabled: true,
          },
        );

        return true;
      } else {
        throw new ForbiddenException("A senha do usuário já foi definida.");
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.debug("AutenticacaoDefinirSenhaCommandHandler#execute::err", error);

      throw new ServiceUnavailableException();
    }
  }

  private async findByMatricula(matricula: string) {
    const usuario = await this.usuarioFindByMatriculaHandler.execute({ matricula });
    const userRepresentation = await this.keycloakService.findUserByMatricula(matricula);

    return {
      usuario,
      userRepresentation,
    };
  }
}

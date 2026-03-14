import { ForbiddenException, HttpException, ServiceUnavailableException } from "@nestjs/common";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
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
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
  ) {}

  async execute({ dto }: IAutenticacaoDefinirSenhaCommand): Promise<boolean> {
    try {
      const usuario = await this.usuarioFindByMatriculaHandler.execute({
        matricula: dto.matricula,
      });
      const exists = await this.idpUserService.existsByMatricula(dto.matricula);

      if (!usuario || !exists) {
        throw new ForbiddenException("Usuário indisponível.");
      }

      const canSet = await this.idpUserService.canSetInitialPassword(dto.matricula);

      if (!canSet) {
        throw new ForbiddenException("A senha do usuário já foi definida.");
      }

      await this.idpUserService.setInitialPassword(dto.matricula, dto.senha);

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.debug("AutenticacaoDefinirSenhaCommandHandler#execute::err", error);

      throw new ServiceUnavailableException();
    }
  }
}

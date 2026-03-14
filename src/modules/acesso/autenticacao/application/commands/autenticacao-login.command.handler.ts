import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { IIdpTokenService, IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IAutenticacaoLoginCommand,
  IAutenticacaoLoginCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { AuthSessionCredentialsDto } from "../dtos";

@DeclareImplementation()
export class AutenticacaoLoginCommandHandlerImpl implements IAutenticacaoLoginCommandHandler {
  constructor(
    @DeclareDependency(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @DeclareDependency(IIdpTokenService)
    private readonly idpTokenService: IIdpTokenService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IAutenticacaoLoginCommand): Promise<AuthSessionCredentialsDto> {
    if (accessContext.requestActor !== null) {
      throw new BadRequestException("Você não pode usar a rota de login caso já esteja logado.");
    }

    const usuario = await this.usuarioFindByMatriculaHandler.execute({ matricula: dto.matricula });
    const username = await this.idpUserService.resolveUsernameByMatricula(dto.matricula);

    try {
      if (usuario && username) {
        const tokenset = await this.idpTokenService.passwordGrant(username, dto.senha);

        return tokenset as AuthSessionCredentialsDto;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas.");
  }
}

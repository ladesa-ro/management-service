import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { DataSource } from "typeorm";
import {
  IDENTITY_PROVIDER_PORT,
  type IIdentityProviderPort,
} from "@/modules/@seguranca/provedor-identidade/ports";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { createUsuarioRepository } from "@/modules/acesso/usuario/infrastructure/persistence/typeorm/usuario.repository";
import type { IRequestActor } from "../domain";
import type { IRequestActorResolverPort } from "../ports";

@Injectable()
export class RequestActorResolverAdapter implements IRequestActorResolverPort {
  constructor(
    @Inject(IDENTITY_PROVIDER_PORT)
    private readonly identityProvider: IIdentityProviderPort,
    @Inject(APP_DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
  ) {}

  private get usuarioRepository() {
    return createUsuarioRepository(this.dataSource);
  }

  async resolveFromAccessToken(accessToken?: string): Promise<IRequestActor> {
    if (typeof accessToken !== "string") {
      return null;
    }

    // Suporte a mock tokens para desenvolvimento
    if (process.env.ENABLE_MOCK_ACCESS_TOKEN === "true") {
      const matriculaMockMatch = accessToken.match(/^mock\.matricula\.(\d+)$/);

      if (matriculaMockMatch) {
        const matricula = matriculaMockMatch[1];
        return this.resolveByMatricula(matricula);
      }
    }

    const tokenSet = await this.identityProvider.getIdentityFromAccessToken(accessToken);

    return this.resolveByMatricula(tokenSet.usuario?.matricula);
  }

  private async resolveByMatricula(matricula: string | undefined): Promise<IRequestActor> {
    if (!matricula) {
      return null;
    }

    const usuario = await this.usuarioRepository
      .createQueryBuilder("usuario")
      .select([
        "usuario.id",
        "usuario.nome",
        "usuario.matricula",
        "usuario.email",
        "usuario.isSuperUser",
      ])
      .where("usuario.matricula = :matricula", { matricula })
      .andWhere("usuario.dateDeleted IS NULL")
      .getOne();

    if (!usuario) {
      throw new ForbiddenException("O usuário não possui perfil no sistema.");
    }

    return pick(usuario, ["id", "nome", "matricula", "email", "isSuperUser"]);
  }
}

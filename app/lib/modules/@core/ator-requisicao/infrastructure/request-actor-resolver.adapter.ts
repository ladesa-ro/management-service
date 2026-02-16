import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { DataSource } from "typeorm";
import { createUsuarioRepository } from "@/modules/@acesso/usuario/infrastructure/persistence/typeorm/usuario.repository";
import {
  IDENTITY_PROVIDER_PORT,
  type IIdentityProviderPort,
} from "@/modules/@core/provedor-identidade/ports";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
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
      const matriculaSiapeMockMatch = accessToken.match(/^mock\.siape\.(\d+)$/);

      if (matriculaSiapeMockMatch) {
        const matriculaSiape = matriculaSiapeMockMatch[1];
        return this.resolveByMatriculaSiape(matriculaSiape);
      }
    }

    const tokenSet = await this.identityProvider.getIdentityFromAccessToken(accessToken);

    return this.resolveByMatriculaSiape(tokenSet.usuario?.matriculaSiape);
  }

  private async resolveByMatriculaSiape(
    matriculaSiape: string | undefined,
  ): Promise<IRequestActor> {
    if (!matriculaSiape) {
      return null;
    }

    const usuario = await this.usuarioRepository
      .createQueryBuilder("usuario")
      .select([
        "usuario.id",
        "usuario.nome",
        "usuario.matriculaSiape",
        "usuario.email",
        "usuario.isSuperUser",
      ])
      .where("usuario.matriculaSiape = :matriculaSiape", { matriculaSiape })
      .andWhere("usuario.dateDeleted IS NULL")
      .getOne();

    if (!usuario) {
      throw new ForbiddenException("O usuário não possui perfil no sistema.");
    }

    return pick(usuario, ["id", "nome", "matriculaSiape", "email", "isSuperUser"]);
  }
}

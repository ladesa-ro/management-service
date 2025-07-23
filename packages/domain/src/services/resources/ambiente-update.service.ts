import { Inject, Injectable } from "@nestjs/common";
import type { IAbstractResourceService, IAmbienteRepository, IAuthorizationService, IRequestActor } from "../../di";
import { DomainTokens } from "../../di/tokens";
import type { T } from "../../typings";
import { ensurePermission } from "../../utils/ensure-permission";
import { AmbienteFindOneService } from "./ambiente-find-one.service";

@Injectable()
export class AmbienteUpdateService implements IAbstractResourceService<T.AmbienteUpdateInput, T.AmbienteFindOneOutput> {
  constructor(
    @Inject(DomainTokens.Repositories.Ambiente)
    private ambienteRepository: IAmbienteRepository,

    @Inject(DomainTokens.Authorization.Service)
    private authorizationService: IAuthorizationService,

    @Inject(AmbienteFindOneService)
    private ambienteFindOneService: AmbienteFindOneService,
  ) {
  }

  async execute(requestActor: IRequestActor, input: T.AmbienteUpdateInput): Promise<T.AmbienteFindOneOutput> {
    const { id } = await this.ambienteFindOneService.execute(requestActor, input);

    await ensurePermission(this.authorizationService, requestActor, "ambiente:update", input);

    await this.ambienteRepository.update({ ...input, id });

    return this.ambienteFindOneService.execute(requestActor, { id });
  }
}
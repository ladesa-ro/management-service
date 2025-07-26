import { Inject, Injectable } from "@nestjs/common";
import type { IAbstractResourceService, IAmbienteRepository, IAuthorizationService, IRequestActor } from "../../di";
import { DomainTokens } from "../../di/tokens";
import type { T } from "../../typings";
import { ensurePermission } from "../../utils/ensure-permission";
import { AmbienteFindOneService } from "./ambiente-find-one.service";

@Injectable()
export class AmbienteDeleteService implements IAbstractResourceService<T.AmbienteFindOneInput, true> {
  constructor(
    @Inject(DomainTokens.Repositories.Ambiente)
    private ambienteRepository: IAmbienteRepository,

    @Inject(DomainTokens.Authorization.Service)
    private authorizationService: IAuthorizationService,

    @Inject(AmbienteFindOneService)
    private ambienteFindOneService: AmbienteFindOneService,
  ) {
  }

  async execute(requestActor: IRequestActor, input: T.AmbienteFindOneInput): Promise<true> {
    const { id } = await this.ambienteFindOneService.execute(requestActor, input);

    await ensurePermission(this.authorizationService, requestActor, "ambiente:delete", input);

    await this.ambienteRepository.deleteOne({ id });

    return true;
  }
}
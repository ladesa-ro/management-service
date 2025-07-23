import { Inject, Injectable } from "@nestjs/common";
import type { IAbstractResourceService, IAmbienteRepository, IAuthorizationService, IRequestActor } from "../../di";
import { DomainTokens } from "../../di";
import type { T } from "../../typings";
import { ensurePermission } from "../../utils/ensure-permission";

@Injectable()
export class AmbienteFindOneService implements IAbstractResourceService<T.AmbienteFindOneInput, T.AmbienteFindOneOutput> {
  constructor(
    @Inject(DomainTokens.Repositories.Ambiente)
    private ambienteRepository: IAmbienteRepository,

    @Inject(DomainTokens.Authorization.Service)
    private authorizationService: IAuthorizationService,
  ) {
  }

  async execute(requestActor: IRequestActor, input: T.AmbienteFindOneInput): Promise<T.AmbienteFindOneOutput> {
    await ensurePermission(this.authorizationService, requestActor, "ambiente:find", input)

    return this.ambienteRepository.findOne(input)
  }
}
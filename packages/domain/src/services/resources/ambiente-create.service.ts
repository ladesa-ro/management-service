import { Inject, Injectable } from "@nestjs/common";
import type { IAuthorizationService, IRequestActor } from "../../di";
import type { IAbstractResourceService } from "../../di/contracts/abstract-resource-service.interface";
import type { IAmbienteRepository } from "../../di/contracts/repositories/ambiente-repository.interface";
import { DomainTokens } from "../../di/tokens";
import type { T } from "../../typings";
import { ensurePermission } from "../../utils/ensure-permission";
import { AmbienteFindOneService } from "./ambiente-find-one.service";

@Injectable()
export class AmbienteCreateService implements IAbstractResourceService<T.AmbienteCreateInput, T.AmbienteFindOneOutput> {
  constructor(
    @Inject(DomainTokens.Repositories.Ambiente)
    private ambienteRepository: IAmbienteRepository,

    @Inject(DomainTokens.Authorization.Service)
    private authorizationService: IAuthorizationService,

    @Inject(AmbienteFindOneService)
    private findOneService: AmbienteFindOneService,
  ) {
  }

  async execute(requestActor: IRequestActor, input: T.AmbienteCreateInput): Promise<T.AmbienteFindOneOutput> {
    await ensurePermission(this.authorizationService, requestActor, "ambiente:create", input)

    const { id } = await this.ambienteRepository.create(input);

    return this.findOneService.execute(requestActor, { id });
  }
}
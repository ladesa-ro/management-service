import { ESTADO_REPOSITORY, type EstadoFindOneByIdInputDto, EstadoFindOneByIdQuery, type EstadoListInputDto, EstadoListQuery, type IEstadoAuthorizationPort, type IEstadoRepositoryPort, type IEstadoUseCasesPort } from "@/features";
import { Inject, Injectable } from "@/shared";

@Injectable("Singleton")
export class EstadoApplicationService implements IEstadoUseCasesPort {
  constructor(@Inject(ESTADO_REPOSITORY) private readonly repository: IEstadoRepositoryPort) {}

  async estadoFindOneById(authz: IEstadoAuthorizationPort, dto: EstadoFindOneByIdInputDto) {
    const query = new EstadoFindOneByIdQuery(this.repository);
    return query.execute(authz, dto);
  }

  async estadoList(authz: IEstadoAuthorizationPort, dto: EstadoListInputDto) {
    const query = new EstadoListQuery(this.repository);
    return query.execute(authz, dto);
  }
}

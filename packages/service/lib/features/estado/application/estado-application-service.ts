import { Inject, Injectable } from "@nestjs/common";
import { EstadoFindOneByIdInputDto, EstadoListInputDto } from "@/features/estado/application/dtos";
import {
  ESTADO_REPOSITORY,
  type IEstadoAuthorizationPort,
  type IEstadoRepositoryPort
} from "@/features/estado/application/ports";
import { EstadoFindOneByIdQuery, EstadoListQuery } from "@/features/estado/application/queries";

@Injectable()
export class EstadoApplicationService {
  constructor(
    @Inject(ESTADO_REPOSITORY)
    readonly estadoRepository: IEstadoRepositoryPort,
  ) {
  }

  estadoList(authorization: IEstadoAuthorizationPort, inputDto: EstadoListInputDto) {
    const findAllQuery = new EstadoListQuery(this.estadoRepository);
    return findAllQuery.execute(authorization, inputDto);
  }

  estadoFindOneById(authorization: IEstadoAuthorizationPort, inputDto: EstadoFindOneByIdInputDto) {
    const findOneByIdQuery = new EstadoFindOneByIdQuery(this.estadoRepository);
    return findOneByIdQuery.execute(authorization, inputDto);
  }
}

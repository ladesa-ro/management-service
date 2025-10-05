import { BaseApplicationQuery, BaseForbiddenError, BaseNotFoundError } from "../../../../shared";
import type { IEstadoRepositoryPort } from "../ports";
import type { EstadoFindOneByIdInputDto, EstadoFindOneByIdOutputDto } from "../dtos";
import type { IEstadoAuthorizationPort } from "../ports";

export class EstadoFindOneByIdQuery extends BaseApplicationQuery {
  constructor(
    private readonly estadoRepository: IEstadoRepositoryPort,
  ) {
    super();
  }

  async execute(estadoAuthorization: IEstadoAuthorizationPort, input: EstadoFindOneByIdInputDto): Promise<EstadoFindOneByIdOutputDto> {
    const estado = await this.estadoRepository.findOneById({id: input.id});

    if (!estado) {
      throw new BaseNotFoundError();
    }

    const canRead = await estadoAuthorization.canRead({ id: estado.id });

    if (!canRead) {
      throw new BaseForbiddenError();
    }

    return estado;
  }
}
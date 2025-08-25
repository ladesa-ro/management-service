import {
  EstadoFindOneByIdInputDto,
  EstadoFindOneByIdOutputDto,
  EstadoFindOneByIdOutputSchema
} from "@/features/estado/application/dtos/estado-find-one-by-id.dto";
import { EstadoForbiddenReadError, EstadoNaoEncontradoError } from "@/features/estado/application/errors/estado.errors";
import type { IEstadoAuthorizationPort, IEstadoRepositoryPort } from "@/features/estado/application/ports";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared-novo";
import { IBaseOperationMetadata } from "@/shared-novo/common/application/operations/base.operation";

export class EstadoFindOneByIdQuery extends BaseQuery {
  static meta: IBaseOperationMetadata = {
    operationId: "EstadoFindOneById",
    summary: "Operação para encontrar um estado pelo id",
    description: "Operação para encontrar um estado pelo id",
    responseSchemaFactory: () => EstadoFindOneByIdOutputSchema,
  };

  constructor(private readonly estadoRepository: IEstadoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEstadoAuthorizationPort, inputDto: EstadoFindOneByIdInputDto): Promise<EstadoFindOneByIdOutputDto> {
    const selection = getAllowedSelectionFromSchema(EstadoFindOneByIdOutputSchema, inputDto.selection);

    const estado = await this.estadoRepository.findById(inputDto.id, selection);

    if (!estado) {
      throw new EstadoNaoEncontradoError(`Estado não encontrado (id = ${inputDto.id}).`);
    }

    const canRead = await authorization.canRead(estado.id);

    if (!canRead) {
      throw new EstadoForbiddenReadError();
    }

    return estado;
  }
}

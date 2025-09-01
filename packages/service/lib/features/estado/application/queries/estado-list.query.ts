import { EstadoListInputDto, EstadoListInputSchema, EstadoListOutputDto, EstadoListOutputItemSchema } from "@/features/estado/application/dtos";
import type { IEstadoAuthorizationPort, IEstadoRepositoryPort } from "@/features/estado/application/ports";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared";
import { validateDto } from "@/shared/base-entity/application/helpers/validate-dto";

export class EstadoListQuery extends BaseQuery {
  constructor(private readonly estadoRepository: IEstadoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEstadoAuthorizationPort, incomingInputDto: EstadoListInputDto | unknown): Promise<EstadoListOutputDto> {
    const validatedInputDto: EstadoListInputDto = await validateDto(EstadoListInputSchema, incomingInputDto);

    const selection = getAllowedSelectionFromSchema(EstadoListOutputItemSchema, validatedInputDto.selection);
    const readFilters = await authorization.getReadFilters();

    return this.estadoRepository.list(readFilters, validatedInputDto, selection);
  }
}

import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/v2/adapters/in/http/calendario-letivo/dto";

/**
 * Port de entrada para casos de uso de CalendarioLetivo
 * Define o contrato que o service deve implementar
 */
export interface ICalendarioLetivoUseCasePort {
  calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto>;

  caledarioLetivoFindById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;

  calendarioLetivoFindByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;

  calendarioLetivoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean>;
}

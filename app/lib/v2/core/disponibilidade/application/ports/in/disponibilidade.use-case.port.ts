import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/v2/server/modules/disponibilidade/http/dto";

/**
 * Porta de entrada (use case) para operações de Disponibilidade
 * Define os casos de uso disponíveis para o domínio
 */
export interface IDisponibilidadeUseCasePort {
  disponibilidadeFindAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null,
    selection?: string[],
  ): Promise<DisponibilidadeListOutputDto>;

  disponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null>;

  disponibilidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto>;

  disponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null>;

  disponibilidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto>;

  disponibilidadeCreate(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;

  disponibilidadeUpdate(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;

  disponibilidadeDeleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<boolean>;
}

import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "../../dtos";

export interface IEtapaUseCasePort {
  etapaFindAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto>;

  etapaFindById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null>;

  etapaFindByIdStrict(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto>;

  etapaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null>;

  etapaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto>;

  etapaCreate(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto>;

  etapaUpdate(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto>;

  etapaDeleteOneById(accessContext: AccessContext, dto: EtapaFindOneInputDto): Promise<boolean>;
}

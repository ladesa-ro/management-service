import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type EtapaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaCreateInputDto";
import { type EtapaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneInputDto";
import { type EtapaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneOutputDto";
import { type EtapaListInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaListInputDto";
import { type EtapaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaListOutputDto";
import { type EtapaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaUpdateInputDto";

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

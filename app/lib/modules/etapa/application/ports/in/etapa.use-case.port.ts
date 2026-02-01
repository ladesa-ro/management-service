import type { AccessContext } from "@/modules/@core/access-context";
import type {
  EtapaCreateInput,
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  EtapaUpdateInput,
} from "../../dtos";

export interface IEtapaUseCasePort {
  etapaFindAll(
    accessContext: AccessContext,
    dto: EtapaListInput | null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutput>;

  etapaFindById(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutput | null>;

  etapaFindByIdStrict(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutput>;

  etapaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput | null>;

  etapaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput>;

  etapaCreate(accessContext: AccessContext, dto: EtapaCreateInput): Promise<EtapaFindOneOutput>;

  etapaUpdate(
    accessContext: AccessContext,
    dto: EtapaFindOneInput & EtapaUpdateInput,
  ): Promise<EtapaFindOneOutput>;

  etapaDeleteOneById(accessContext: AccessContext, dto: EtapaFindOneInput): Promise<boolean>;
}

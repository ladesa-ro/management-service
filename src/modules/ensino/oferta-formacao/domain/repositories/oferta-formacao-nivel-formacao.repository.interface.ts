import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao";
import type {
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQueryResult,
} from "../queries";

export const IOfertaFormacaoNivelFormacaoRepository = Symbol(
  "IOfertaFormacaoNivelFormacaoRepository",
);

export type IOfertaFormacaoNivelFormacaoRepository =
  IRepositoryFindAll<OfertaFormacaoNivelFormacaoListQueryResult> &
    IRepositoryFindById<OfertaFormacaoNivelFormacaoFindOneQueryResult> &
    IRepositoryCreate<IOfertaFormacaoNivelFormacao> &
    IRepositoryUpdate<IOfertaFormacaoNivelFormacao> &
    IRepositorySoftDelete & {
      softDeleteByOfertaFormacaoId(ofertaFormacaoId: string): Promise<void>;

      bulkCreate(
        entries: Array<{
          ofertaFormacaoId: string;
          nivelFormacaoId: string;
        }>,
      ): Promise<void>;
    };

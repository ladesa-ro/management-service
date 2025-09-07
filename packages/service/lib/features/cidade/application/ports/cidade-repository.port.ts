import {
  CidadeFindOneByIdInputDto,
  CidadeFindOneByIdOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto
} from "../dtos";
import { IBaseRepositoryFindOneByIdPort, IBaseRepositoryListPort } from "@/shared";

export const CIDADE_REPOSITORY = Symbol("Ladesa.ManagementService.Cidade.Ports.Repository");

type RepositoryList = IBaseRepositoryListPort<CidadeListInputDto, CidadeListOutputDto>;
type RepositoryFindOneById = IBaseRepositoryFindOneByIdPort<CidadeFindOneByIdInputDto["id"], CidadeFindOneByIdOutputDto>;

export interface ICidadeRepositoryPort extends RepositoryList, RepositoryFindOneById {
}

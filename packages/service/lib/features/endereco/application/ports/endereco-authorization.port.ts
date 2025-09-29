import { EnderecoCreateInputDto, EnderecoUpdateInputDto } from "@/features/endereco/application/dtos";
import { IFilterRuleGroup } from "@/shared";
import { EnderecoFindOneByIdInputDto } from "../dtos/endereco-find-one-by-id.dto";

export interface IEnderecoAuthorizationPort {
  canRead: (id: EnderecoFindOneByIdInputDto["id"]) => Promise<boolean>;
  getReadFilters: () => Promise<IFilterRuleGroup> | boolean;

  canCreate: (inputDto: EnderecoCreateInputDto) => Promise<boolean>;
  canUpdate: (inputDto: EnderecoUpdateInputDto) => Promise<boolean>;

  canDelete: (id: EnderecoFindOneByIdInputDto["id"]) => Promise<boolean>;
}

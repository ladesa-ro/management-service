import { CampusCreateInputDto, CampusUpdateOneByIdInputDto } from "@/features/campus/application/dtos";
import { IFilterRuleGroup } from "@/shared";
import { CampusFindOneByIdInputDto } from "../dtos/campus-find-one-by-id-input.dto";

export interface ICampusAuthorizationPort {
  canRead: (id: CampusFindOneByIdInputDto["id"]) => Promise<boolean> | boolean;
  getReadFilters: () => Promise<IFilterRuleGroup> | boolean;

  canCreate: (inputDto: CampusCreateInputDto) => Promise<boolean> | boolean;
  canUpdate: (inputDto: CampusUpdateOneByIdInputDto) => Promise<boolean> | boolean;

  canDelete: (id: CampusFindOneByIdInputDto["id"]) => Promise<boolean> | boolean;
}

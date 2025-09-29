import { Campus } from "@/features/campus/domain";
import { IFilterRuleGroup } from "@/shared";
import {
  CampusCreateInputDto,
  CampusFindOneByIdOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateOneByIdInputDto
} from "../dtos";

export const CAMPUS_REPOSITORY = Symbol("Ladesa.ManagementService.Campus.Ports.Repository");

export interface ICampusRepositoryPort {
  findOneById(id: Campus["id"], selection?: string[]): Promise<CampusFindOneByIdOutputDto | null>;

  create(inputDto: CampusCreateInputDto): Promise<{ id: Campus["id"] }>;

  updateOneById(inputDto: CampusUpdateOneByIdInputDto): Promise<{ id: Campus["id"] }>;

  deleteOneById(id: Campus["id"]): Promise<{ id: Campus["id"] }>;

  list(allowedFilters: IFilterRuleGroup | true | false, inputDto: CampusListInputDto, selection?: string[]): Promise<CampusListOutputDto>;
}

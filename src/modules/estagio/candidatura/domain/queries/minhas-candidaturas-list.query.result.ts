import type { IPaginationResult } from "@/application/pagination";
import type { IMinhasCandidaturasItem } from "../repositories/estagio-candidatura.repository.interface";

export type MinhasCandidaturasListQueryResult = IPaginationResult<IMinhasCandidaturasItem>;

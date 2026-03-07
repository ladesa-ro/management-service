import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { EventoFindOneOutputDto } from "./EventoFindOneOutputDto";

export class EventoListOutputDto extends PaginationResultDto<EventoFindOneOutputDto> {}

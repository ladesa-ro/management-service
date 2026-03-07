import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export class ReservaFindOneOutputDto extends EntityOutputDto {
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: AmbienteFindOneOutputDto;
  usuario!: UsuarioFindOneOutputDto;
}

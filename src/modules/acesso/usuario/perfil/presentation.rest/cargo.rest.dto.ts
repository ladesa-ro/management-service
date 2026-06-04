import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiSchema } from "@/shared/presentation/rest";
import { PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "CargoCreateInputDto" })
export class CargoCreateInputRestDto {
  @ApiProperty({ description: "Nome do cargo", example: "Professor" })
  nome!: string;
}

@ApiSchema({ name: "CargoUpdateInputDto" })
export class CargoUpdateInputRestDto {
  @ApiPropertyOptional({ description: "Nome do cargo", example: "Professor Coordenador" })
  nome?: string;
}

@ApiSchema({ name: "CargoOutputDto" })
export class CargoOutputRestDto {
  @ApiProperty({ description: "ID do cargo", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Nome do cargo", example: "Professor" })
  nome!: string;
}

@ApiSchema({ name: "CargoListOutputDto" })
export class CargoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CargoOutputRestDto] })
  data!: CargoOutputRestDto[];
}

@ApiSchema({ name: "CargoListInputDto" })
export class CargoListInputRestDto {
  @ApiPropertyOptional({ description: "Página atual", default: 1 })
  page?: number;

  @ApiPropertyOptional({ description: "Itens por página", default: 20 })
  limit?: number;
}

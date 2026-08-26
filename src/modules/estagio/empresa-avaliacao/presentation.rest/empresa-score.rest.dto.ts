import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto } from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "EmpresaScoreDistributionDto" })
export class EmpresaScoreDistributionRestDto {
  @ApiProperty({ description: "Total de avaliações com 1 estrela", example: 0 })
  1: number;

  @ApiProperty({ description: "Total de avaliações com 2 estrelas", example: 1 })
  2: number;

  @ApiProperty({ description: "Total de avaliações com 3 estrelas", example: 3 })
  3: number;

  @ApiProperty({ description: "Total de avaliações com 4 estrelas", example: 8 })
  4: number;

  @ApiProperty({ description: "Total de avaliações com 5 estrelas", example: 15 })
  5: number;
}

@ApiSchema({ name: "EmpresaScoreFindOneOutputDto" })
export class EmpresaScoreFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ description: "ID da empresa avaliada" })
  empresaId: string;

  @ApiProperty({
    description: "Score normalizado de 0 a 100 ponderado por recência e regularização Bayesiana",
    example: 84.5,
  })
  score: number;

  @ApiProperty({
    description: "Média simples das notas de 1 a 5 estrelas",
    example: 4.62,
  })
  averageRating: number;

  @ApiProperty({
    description: "Quantidade total de avaliações contabilizadas",
    example: 27,
  })
  totalReviews: number;

  @ApiProperty({
    description: "Distribuição das notas por estrelas",
    type: () => EmpresaScoreDistributionRestDto,
  })
  distribution: EmpresaScoreDistributionRestDto;

  @ApiProperty({
    description: "Versão do algoritmo estatístico utilizado para calcular o score",
    example: 1,
  })
  scoreVersion: number;

  @ApiPropertyOptional({
    description: "Indicadores estatísticos complementares utilizados no cálculo",
  })
  indicators?: Record<string, any> | null;

  @ApiProperty({
    description: "Data/hora do último cálculo",
  })
  calculatedAt: string;
}

import { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil";
import { UsuarioGraphqlMapper } from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.mapper";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import { mapDatedFields } from "@/shared/mapping";
import { PerfilFindOneOutputGraphQlDto } from "./perfil.graphql.dto";

export class PerfilGraphqlMapper {
  private static getCargoNome(output: PerfilFindOneQueryResult): string {
    return output.cargo?.nome ?? "";
  }

  static toFindOneOutputDto(output: PerfilFindOneQueryResult): PerfilFindOneOutputGraphQlDto {
    const dto = new PerfilFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.ativo = output.ativo;
    dto.cargo = PerfilGraphqlMapper.getCargoNome(output);
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.usuario = UsuarioGraphqlMapper.toFindOneOutputDto(output.usuario);
    mapDatedFields(dto, output);
    return dto;
  }
}

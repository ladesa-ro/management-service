import type { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil";
import * as UsuarioGraphqlMapper from "@/modules/acesso/usuario/presentation.graphql/usuario.graphql.mapper";
import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import { createMapper } from "@/shared/mapping";
import { PerfilFindOneOutputGraphQlDto } from "./perfil.graphql.dto";

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

function getCargoNome(output: PerfilFindOneQueryResult): string {
  return output.cargo?.nome ?? "";
}

export const toFindOneOutput = createMapper<
  PerfilFindOneQueryResult,
  PerfilFindOneOutputGraphQlDto
>((output) => {
  const dto = new PerfilFindOneOutputGraphQlDto();
  dto.id = output.id;
  dto.ativo = output.ativo;
  dto.cargo = getCargoNome(output);
  dto.campus = CampusGraphqlMapper.toFindOneOutput.map(output.campus);
  dto.usuario = UsuarioGraphqlMapper.toFindOneOutput.map(output.usuario);
  dto.dateCreated = new Date(output.dateCreated);
  dto.dateUpdated = new Date(output.dateUpdated);
  dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
  return dto;
});

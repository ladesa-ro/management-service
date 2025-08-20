import type KeycloakAdminClientPrimitive from "@keycloak/keycloak-admin-client";
import KcModule from "@keycloak/keycloak-admin-client";

const KeycloakAdminClient = KcModule;
type KeycloakAdminClient = KeycloakAdminClientPrimitive;

export { KeycloakAdminClient };

// END @keycloak/keycloak-admin-client module

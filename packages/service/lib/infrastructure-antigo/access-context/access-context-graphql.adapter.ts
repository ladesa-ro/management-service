import { RequestActorGql } from "@/infrastructure-antigo/authentication";
import { ResolveAccessContextPipe } from "./pipes/resolve-access-context.pipe";

export const AccessContextGraphQl = (options?: any) => RequestActorGql(options, ResolveAccessContextPipe);

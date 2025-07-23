import { RequestActorHttp } from "@/infrastructure/authentication";
import { ResolveAccessContextPipe } from "./pipes/resolve-access-context.pipe";

export const AccessContextHttp = (options?: any) => RequestActorHttp(options, ResolveAccessContextPipe);

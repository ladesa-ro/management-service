import { PassportSerializer } from "@nestjs/passport";
import { DeclareImplementation } from "@/domain/dependency-injection";

/**
 * Serializer para sessões de autenticação.
 */
@DeclareImplementation()
export class AuthSerializerAdapter extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error | null, payload: string) => void): any {
    done(null, payload);
  }
}

import { PassportSerializer } from "@nestjs/passport";
import { Impl } from "@/domain/dependency-injection";

@Impl()
export class AuthSerializerAdapter extends PassportSerializer {
  serializeUser(
    user: Record<string, unknown>,
    done: (err: Error | null, user: Record<string, unknown>) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(payload: string, done: (err: Error | null, payload: string) => void): void {
    done(null, payload);
  }
}

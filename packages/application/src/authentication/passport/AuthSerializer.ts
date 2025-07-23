import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class AuthSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error | null, payload: string) => void): any {
    done(null, payload);
  }
}

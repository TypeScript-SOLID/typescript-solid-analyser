import { User } from "./user.interface"

export interface SessionPayload {
  readonly access_token: string;
  readonly user: User;
}
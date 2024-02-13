import { users } from '@prisma/client';

export class AuthResponse {
  token: string;
  user: users;
}

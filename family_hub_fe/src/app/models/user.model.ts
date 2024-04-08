export interface User {
  userId?: number;
  username?: string;
  name: string;
  password?: string;
  role?: string | null;
  events?: Set<number>;
}


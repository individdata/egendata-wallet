export type AuthorizedUser = {
  webid: string;
  name: string;
  storage: string;
  id: string;
  completed: boolean;
  egendataDefined: boolean;
} | Record<string, never>;

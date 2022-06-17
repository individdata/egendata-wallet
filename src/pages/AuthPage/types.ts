export type AuthorizedUser = {
  webid: string;
  name: string;
  storage: string;
  id: string;
  uuid: string;
  completed: boolean;
  egendataDefined: boolean;
} | Record<string, never>;

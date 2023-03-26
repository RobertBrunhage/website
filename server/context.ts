import { getSession } from '@auth0/nextjs-auth0';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await getSession(req, res);
  return {
    session,
    req,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

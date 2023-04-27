import { getSession } from "@auth0/nextjs-auth0";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await getSession(req, res);
  const ip = req.socket.remoteAddress ?? "127.0.0.1";
  return {
    session,
    ip,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

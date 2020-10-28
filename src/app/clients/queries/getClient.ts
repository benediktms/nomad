import { Ctx, NotFoundError } from "blitz";
import db, { FindFirstClientArgs } from "db";

type GetClientInput = Pick<FindFirstClientArgs, "where">;

export default async function getClient({ where }: GetClientInput, ctx: Ctx) {
  ctx.session.authorize();

  const client = await db.client.findFirst({ where });

  if (!client) throw new NotFoundError();

  return client;
}

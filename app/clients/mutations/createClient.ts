import { Ctx } from "blitz";
import db, { ClientCreateArgs } from "db";

type CreateClientInput = Pick<ClientCreateArgs, "data">;
export default async function createClient(
  { data }: CreateClientInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const client = await db.client.create({ data });

  return client;
}

import { Ctx } from "blitz";
import db, { ClientDeleteArgs } from "db";

type DeleteClientInput = Pick<ClientDeleteArgs, "where">;

export default async function deleteClient(
  { where }: DeleteClientInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const client = await db.client.delete({ where });

  return client;
}

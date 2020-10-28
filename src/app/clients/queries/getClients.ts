import { Ctx } from "blitz";
import db, { FindManyClientArgs } from "db";

type GetClientsInput = Pick<
  FindManyClientArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getClients(
  { where, orderBy, skip = 0, take }: GetClientsInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const clients = await db.client.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.client.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    clients,
    nextPage,
    hasMore,
    count,
  };
}

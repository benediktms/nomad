import { Ctx } from "blitz";
import db, { FindManyInvoiceArgs } from "db";

type GetInvoicesInput = Pick<
  FindManyInvoiceArgs,
  "where" | "orderBy" | "skip" | "take"
>;

export default async function getInvoices(
  { where, orderBy, skip = 0, take }: GetInvoicesInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const invoices = await db.invoice.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.invoice.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    invoices,
    nextPage,
    hasMore,
    count,
  };
}

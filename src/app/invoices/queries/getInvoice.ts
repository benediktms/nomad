import { Ctx, NotFoundError } from "blitz";
import db, { FindFirstInvoiceArgs } from "db";

type GetInvoiceInput = Pick<FindFirstInvoiceArgs, "where">;

export default async function getInvoice({ where }: GetInvoiceInput, ctx: Ctx) {
  ctx.session.authorize();

  const invoice = await db.invoice.findFirst({ where });

  if (!invoice) throw new NotFoundError();

  return invoice;
}

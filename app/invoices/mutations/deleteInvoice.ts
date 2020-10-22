import { Ctx } from "blitz";
import db, { InvoiceDeleteArgs } from "db";

type DeleteInvoiceInput = Pick<InvoiceDeleteArgs, "where">;

export default async function deleteInvoice(
  { where }: DeleteInvoiceInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const invoice = await db.invoice.delete({ where });

  return invoice;
}

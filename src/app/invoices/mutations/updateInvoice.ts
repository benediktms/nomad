import { Ctx } from "blitz";
import db, { InvoiceUpdateArgs } from "db";

type UpdateInvoiceInput = {
  where: InvoiceUpdateArgs["where"];
  data: Omit<InvoiceUpdateArgs["data"], "client">;
  clientId: number;
};

export default async function updateInvoice(
  { where, data }: UpdateInvoiceInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  // Don't allow updating
  delete (data as any).client;

  const invoice = await db.invoice.update({ where, data });

  return invoice;
}

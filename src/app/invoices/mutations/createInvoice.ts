import { Ctx } from "blitz";
import db, { InvoiceCreateArgs } from "db";

type CreateInvoiceInput = {
  data: Omit<InvoiceCreateArgs["data"], "client">;
  clientId: number;
};
export default async function createInvoice(
  { data, clientId }: CreateInvoiceInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const invoice = await db.invoice.create({
    data: { ...data, client: { connect: { id: clientId } } },
  });

  return invoice;
}

import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import {
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
} from "blitz";
import getInvoice from "app/invoices/queries/getInvoice";
import deleteInvoice from "app/invoices/mutations/deleteInvoice";

export const Invoice = () => {
  const router = useRouter();
  const invoiceId = useParam("invoiceId", "number");
  const clientId = useParam("clientId", "number");
  const [invoice] = useQuery(getInvoice, { where: { id: invoiceId } });
  const [deleteInvoiceMutation] = useMutation(deleteInvoice);

  return (
    <div>
      <h1>Invoice {invoice.id}</h1>
      <pre>{JSON.stringify(invoice, null, 2)}</pre>

      <Link
        href="/clients/[clientId]/invoices/[invoiceId]/edit"
        as={`/clients/${clientId}/invoices/${invoice.id}/edit`}
      >
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteInvoiceMutation({ where: { id: invoice.id } });
            router.push(
              "/clients/[clientId]/invoices",
              `/clients/${clientId}/invoices`
            );
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowInvoicePage: BlitzPage = () => {
  const clientId = useParam("clientId", "number");

  return (
    <div>
      <p>
        <Link
          href="/clients/clientId/invoices"
          as={`/clients/${clientId}/invoices`}
        >
          <a>Invoices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Invoice />
      </Suspense>
    </div>
  );
};

ShowInvoicePage.getLayout = (page) => <Layout title={"Invoice"}>{page}</Layout>;

export default ShowInvoicePage;

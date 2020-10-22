import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import {
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
} from "blitz";
import getInvoice from "app/invoices/queries/getInvoice";
import updateInvoice from "app/invoices/mutations/updateInvoice";
import InvoiceForm from "app/invoices/components/InvoiceForm";

export const EditInvoice = () => {
  const router = useRouter();
  const invoiceId = useParam("invoiceId", "number");
  const clientId = useParam("clientId", "number");
  const [invoice, { mutate }] = useQuery(getInvoice, {
    where: { id: invoiceId },
  });
  const [updateInvoiceMutation] = useMutation(updateInvoice);

  return (
    <div>
      <h1>Edit Invoice {invoice.id}</h1>
      <pre>{JSON.stringify(invoice)}</pre>

      <InvoiceForm
        initialValues={invoice}
        onSubmit={async () => {
          try {
            const updated = await updateInvoiceMutation({
              where: { id: invoice.id },
              data: { name: "MyNewName" },
              clientId: clientId!,
            });
            await mutate(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push(
              "/clients/[clientId]/invoices/[invoiceId]",
              `/clients/${clientId}/invoices/${updated.id}`
            );
          } catch (error) {
            console.log(error);
            alert("Error creating invoice " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditInvoicePage: BlitzPage = () => {
  const clientId = useParam("clientId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditInvoice />
      </Suspense>

      <p>
        <Link
          as="/clients/clientId/invoices"
          href={`/clients/${clientId}/invoices`}
        >
          <a>Invoices</a>
        </Link>
      </p>
    </div>
  );
};

EditInvoicePage.getLayout = (page) => (
  <Layout title={"Edit Invoice"}>{page}</Layout>
);

export default EditInvoicePage;

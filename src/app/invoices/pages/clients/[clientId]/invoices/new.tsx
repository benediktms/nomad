import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz";
import createInvoice from "app/invoices/mutations/createInvoice";
import InvoiceForm from "app/invoices/components/InvoiceForm";

const NewInvoicePage: BlitzPage = () => {
  const router = useRouter();
  const clientId = useParam("clientId", "number");
  const [createInvoiceMutation] = useMutation(createInvoice);

  return (
    <div>
      <h1>Create New Invoice</h1>

      <InvoiceForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const invoice = await createInvoiceMutation({
              data: { name: "MyName" },
              clientId: clientId!,
            });
            alert("Success!" + JSON.stringify(invoice));
            router.push(
              "/clients/[clientId]/invoices/[invoiceId]",
              `/clients/${clientId}/invoices/${invoice.id}`
            );
          } catch (error) {
            alert("Error creating invoice " + JSON.stringify(error, null, 2));
          }
        }}
      />

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

NewInvoicePage.getLayout = (page) => (
  <Layout title={"Create New Invoice"}>{page}</Layout>
);

export default NewInvoicePage;

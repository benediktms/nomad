import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz";
import getInvoices from "app/invoices/queries/getInvoices";

const ITEMS_PER_PAGE = 100;

export const InvoicesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const clientId = useParam("clientId", "number");
  const [{ invoices, hasMore }] = usePaginatedQuery(getInvoices, {
    where: { client: { id: clientId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <Link
              href="/clients/[clientId]/invoices/[invoiceId]"
              as={`/clients/${clientId}/invoices/${invoice.id}`}
            >
              <a>{invoice.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const InvoicesPage: BlitzPage = () => {
  const clientId = useParam("clientId", "number");

  return (
    <div>
      <p>
        <Link
          href="/clients/clientId/invoices/new"
          as={`/clients/${clientId}/invoices/new`}
        >
          <a>Create Invoice</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <InvoicesList />
      </Suspense>
    </div>
  );
};

InvoicesPage.getLayout = (page) => <Layout title={"Invoices"}>{page}</Layout>;

export default InvoicesPage;

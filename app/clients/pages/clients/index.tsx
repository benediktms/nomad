import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz";
import getClients from "app/clients/queries/getClients";

const ITEMS_PER_PAGE = 100;

export const ClientsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ clients, hasMore }] = usePaginatedQuery(getClients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href="/clients/[clientId]" as={`/clients/${client.id}`}>
              <a>{client.name}</a>
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

const ClientsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/clients/new">
          <a>Create Client</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ClientsList />
      </Suspense>
    </div>
  );
};

ClientsPage.getLayout = (page) => <Layout title={"Clients"}>{page}</Layout>;

export default ClientsPage;

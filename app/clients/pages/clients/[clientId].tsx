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
import getClient from "app/clients/queries/getClient";
import deleteClient from "app/clients/mutations/deleteClient";

export const Client = () => {
  const router = useRouter();
  const clientId = useParam("clientId", "number");
  const [client] = useQuery(getClient, { where: { id: clientId } });
  const [deleteClientMutation] = useMutation(deleteClient);

  return (
    <div>
      <h1>Client {client.id}</h1>
      <pre>{JSON.stringify(client, null, 2)}</pre>

      <Link href="/clients/[clientId]/edit" as={`/clients/${client.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteClientMutation({ where: { id: client.id } });
            router.push("/clients");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowClientPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/clients">
          <a>Clients</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </div>
  );
};

ShowClientPage.getLayout = (page) => <Layout title={"Client"}>{page}</Layout>;

export default ShowClientPage;

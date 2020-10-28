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
import getClient from "app/clients/queries/getClient";
import updateClient from "app/clients/mutations/updateClient";
import ClientForm from "app/clients/components/ClientForm";

export const EditClient = () => {
  const router = useRouter();
  const clientId = useParam("clientId", "number");
  const [client, { mutate }] = useQuery(getClient, { where: { id: clientId } });
  const [updateClientMutation] = useMutation(updateClient);

  return (
    <div>
      <h1>Edit Client {client.id}</h1>
      <pre>{JSON.stringify(client)}</pre>

      <ClientForm
        initialValues={client}
        onSubmit={async () => {
          try {
            const updated = await updateClientMutation({
              where: { id: client.id },
              data: { name: "MyNewName" },
            });
            await mutate(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push("/clients/[clientId]", `/clients/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert("Error creating client " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditClientPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditClient />
      </Suspense>

      <p>
        <Link href="/clients">
          <a>Clients</a>
        </Link>
      </p>
    </div>
  );
};

EditClientPage.getLayout = (page) => (
  <Layout title={"Edit Client"}>{page}</Layout>
);

export default EditClientPage;

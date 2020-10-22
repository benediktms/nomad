import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createClient from "app/clients/mutations/createClient";
import ClientForm from "app/clients/components/ClientForm";

const NewClientPage: BlitzPage = () => {
  const router = useRouter();
  const [createClientMutation] = useMutation(createClient);

  return (
    <div>
      <h1>Create New Client</h1>

      <ClientForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const client = await createClientMutation({
              data: { name: "MyName" },
            });
            alert("Success!" + JSON.stringify(client));
            router.push("/clients/[clientId]", `/clients/${client.id}`);
          } catch (error) {
            alert("Error creating client " + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link href="/clients">
          <a>Clients</a>
        </Link>
      </p>
    </div>
  );
};

NewClientPage.getLayout = (page) => (
  <Layout title={"Create New Client"}>{page}</Layout>
);

export default NewClientPage;

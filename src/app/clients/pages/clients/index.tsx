import React, { Suspense } from "react";
import {
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  useMutation,
} from "blitz";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link as CLink,
  useColorMode,
} from "@chakra-ui/core";
import Layout from "app/layouts/Layout";
import getClients from "app/clients/queries/getClients";
import deleteClient from "../../mutations/deleteClient";

const ITEMS_PER_PAGE = 10;

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
  const { colorMode } = useColorMode();
  const [deleteClientMutation] = useMutation(deleteClient);

  return (
    <main>
      {/* <ul> */}
      <Box my={5}>
        {clients.map((client) => (
          // <li key={client.id}>
          <Box
            p={3}
            mb={3}
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            rounded="lg"
          >
            <Link href="/clients/[clientId]" as={`/clients/${client.id}`}>
              <Flex justify="space-between" align="center">
                <p>
                  <CLink>{client.name}</CLink>
                </p>
                <Box>
                  <Link href={`clients/${client.id}/edit`}>
                    <Button mr={2}>
                      <Icon name="edit" aria-label="edit client" />
                    </Button>
                  </Link>
                  <Button
                    onClick={async () => {
                      if (window.confirm("This will be deleted")) {
                        await deleteClientMutation({
                          where: { id: client.id },
                        });
                        router.push("/clients");
                      }
                    }}
                  >
                    <Icon name="delete" aria-label="delete client" />
                  </Button>
                </Box>
              </Flex>
            </Link>
          </Box>
          // </li>
        ))}
      </Box>
      {/* </ul> */}

      <Button isDisabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </Button>
      <Button isDisabled={!hasMore} onClick={goToNextPage} ml={2}>
        Next
      </Button>
    </main>
  );
};

const ClientsPage: BlitzPage = () => {
  return (
    <Flex w="75%" mx="auto" my={4} justifyContent="center" direction="column">
      <Heading as="h2" mb={3}>
        My Clients
      </Heading>
      <Box>
        <Link href="/clients/new">
          <Button variantColor="purple">Create Client</Button>
        </Link>
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <ClientsList />
      </Suspense>
    </Flex>
  );
};

ClientsPage.getLayout = (page) => <Layout title={"Clients"}>{page}</Layout>;

export default ClientsPage;

import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz";
import getProjects from "app/projects/queries/getProjects";

const ITEMS_PER_PAGE = 100;

export const ProjectsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const clientId = useParam("clientId", "number");
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    where: { Client: { id: clientId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href="/clients/[clientId]/projects/[projectId]"
              as={`/clients/${clientId}/projects/${project.id}`}
            >
              <a>{project.name}</a>
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

const ProjectsPage: BlitzPage = () => {
  const clientId = useParam("clientId", "number");

  return (
    <div>
      <p>
        <Link
          href="/clients/clientId/projects/new"
          as={`/clients/${clientId}/projects/new`}
        >
          <a>Create Project</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </div>
  );
};

ProjectsPage.getLayout = (page) => <Layout title={"Projects"}>{page}</Layout>;

export default ProjectsPage;

import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getProjects from "app/projects/queries/getProjects"
import { Box, Button, Heading, Link as CLink, Skeleton } from "@chakra-ui/core"

const ITEMS_PER_PAGE = 10

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Box my={4} mx={4}>
      <Heading>Projects</Heading>
      <div>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link href="/projects/[projectId]" as={`/projects/${project.id}`}>
                <CLink>{project.name}</CLink>
              </Link>
            </li>
          ))}
        </ul>

        <Button isDisabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button isDisabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </Box>
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/projects/new">
          <Button>Create Project</Button>
        </Link>
      </p>

      <Suspense
        fallback={
          <Box w={200}>
            <Heading>Projects</Heading>
            <Skeleton height="20px" my="10px" />
            <Skeleton height="20px" my="10px" />
            <Skeleton height="20px" my="10px" />
          </Box>
        }
      >
        <ProjectsList />
      </Suspense>
    </div>
  )
}

ProjectsPage.getLayout = (page) => <Layout title={"Projects"}>{page}</Layout>

export default ProjectsPage

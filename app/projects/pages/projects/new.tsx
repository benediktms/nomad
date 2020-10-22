import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProject from "app/projects/mutations/createProject"
import ProjectForm from "app/projects/components/ProjectForm"
import { useCurrentUser } from "../../../hooks/useCurrentUser"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const project = await createProjectMutation({
              data: {
                name: "MyName",
                user: {
                  connect: { id: currentUser?.id },
                },
              },
            })
            alert("Success!" + JSON.stringify(project))
            router.push("/projects/[projectId]", `/projects/${project.id}`)
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectPage.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, useParam, BlitzPage } from "blitz";
import createProject from "app/projects/mutations/createProject";
import ProjectForm from "app/projects/components/ProjectForm";

const NewProjectPage: BlitzPage = () => {
  const router = useRouter();
  const clientId = useParam("clientId", "number");
  const [createProjectMutation] = useMutation(createProject);

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const project = await createProjectMutation({
              data: { name: "MyName" },
              clientId: clientId!,
            });
            alert("Success!" + JSON.stringify(project));
            router.push(
              "/clients/[clientId]/projects/[projectId]",
              `/clients/${clientId}/projects/${project.id}`
            );
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link
          as="/clients/clientId/projects"
          href={`/clients/${clientId}/projects`}
        >
          <a>Projects</a>
        </Link>
      </p>
    </div>
  );
};

NewProjectPage.getLayout = (page) => (
  <Layout title={"Create New Project"}>{page}</Layout>
);

export default NewProjectPage;

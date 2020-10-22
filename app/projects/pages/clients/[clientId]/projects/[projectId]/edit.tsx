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
import getProject from "app/projects/queries/getProject";
import updateProject from "app/projects/mutations/updateProject";
import ProjectForm from "app/projects/components/ProjectForm";

export const EditProject = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
  const clientId = useParam("clientId", "number");
  const [project, { mutate }] = useQuery(getProject, {
    where: { id: projectId },
  });
  const [updateProjectMutation] = useMutation(updateProject);

  return (
    <div>
      <h1>Edit Project {project.id}</h1>
      <pre>{JSON.stringify(project)}</pre>

      <ProjectForm
        initialValues={project}
        onSubmit={async () => {
          try {
            const updated = await updateProjectMutation({
              where: { id: project.id },
              data: { name: "MyNewName" },
              clientId: clientId!,
            });
            await mutate(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push(
              "/clients/[clientId]/projects/[projectId]",
              `/clients/${clientId}/projects/${updated.id}`
            );
          } catch (error) {
            console.log(error);
            alert("Error creating project " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditProjectPage: BlitzPage = () => {
  const clientId = useParam("clientId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

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

EditProjectPage.getLayout = (page) => (
  <Layout title={"Edit Project"}>{page}</Layout>
);

export default EditProjectPage;

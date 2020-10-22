import { Ctx } from "blitz";
import db, { ProjectUpdateArgs } from "db";

type UpdateProjectInput = {
  where: ProjectUpdateArgs["where"];
  data: Omit<ProjectUpdateArgs["data"], "client">;
  clientId: number;
};

export default async function updateProject(
  { where, data }: UpdateProjectInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  // Don't allow updating
  delete (data as any).client;

  const project = await db.project.update({ where, data });

  return project;
}

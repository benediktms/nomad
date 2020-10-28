import { Ctx } from "blitz";
import db, { ProjectCreateArgs } from "db";

type CreateProjectInput = {
  data: Omit<ProjectCreateArgs["data"], "client">;
  clientId: number;
};
export default async function createProject(
  { data, clientId }: CreateProjectInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const project = await db.project.create({
    data: { ...data, Client: { connect: { id: clientId } } },
  });

  return project;
}

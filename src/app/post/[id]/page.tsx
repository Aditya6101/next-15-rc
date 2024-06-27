import prisma from "@/db";
import { revalidatePath } from "next/cache";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold pb-4 border-b border-b-slate-600">
        {post?.title}
      </h1>
      <p>{post?.content}</p>
    </div>
  );
}

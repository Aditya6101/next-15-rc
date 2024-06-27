import prisma from "@/db";
import assert from "assert";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Home() {
  let posts = await prisma.post.findMany();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold pb-4 border-b border-b-slate-600">
        Posts
      </h1>

      <div>
        Create Post
        <form
          action={async (formData) => {
            "use server";
            const title = formData.get("title");
            const content = formData.get("content");

            if (typeof title !== "string" || typeof content !== "string")
              return { err: "post cannot be created" };

            await prisma.post.create({ data: { title, content } });
            revalidatePath("/");
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea name="content" />
          </div>
          <button>Create</button>
        </form>
      </div>

      <ul className="py-4 list-disc list-inside">
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="underline" href={`/post/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

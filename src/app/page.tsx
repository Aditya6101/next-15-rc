import prisma from "@/db";
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
          <div className="w-full sm:max-w-sm">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 w-full sm:max-w-sm">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 my-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </form>
      </div>

      <ul className="py-4 list-disc list-inside">
        {posts.map((post) => (
          <li key={post.id} className="flex space-x-2">
            <Link className="underline" href={`/post/${post.id}`}>
              {post.title}{" "}
            </Link>
            <form
              action={async () => {
                "use server";
                await prisma.post.delete({ where: { id: post.id } });
                revalidatePath("/");
              }}
            >
              <button>X</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

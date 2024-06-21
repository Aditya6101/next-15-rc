import prisma from "@/db";

export default async function Home() {
  let posts = await prisma.post.findMany();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold pb-4 border-b border-b-slate-600">
        Posts
      </h1>
      <ul className="py-4 list-disc list-inside">
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

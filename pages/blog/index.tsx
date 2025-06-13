import Link from "next/link";
import { GetStaticProps } from "next";
import { getBlogSlugs, getBlogBySlug } from "../../lib/blogs";
import ContainerBlock from "@components/ContainerBlock";

type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

type BlogIndexProps = {
  blogs: BlogMeta[];
};

export default function BlogIndex({ blogs }: BlogIndexProps) {
  return (
    <ContainerBlock>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-zinc-500/10 text-gray-300 rounded-2xl shadow-xl p-8 ">
          <h1 className="text-4xl font-extrabold mb-10 drop-shadow-sm">
            Read Our Blog
          </h1>
          <ul className="space-y-8">
            {blogs.map((blog) => (
              <li key={blog.slug} className="transition hover:scale-[1.02]">
                <Link href={`/blog/${blog.slug}`}>
                  <div className="cursor-pointer group">
                    <span className="text-2xl font-bold text-blue-200 group-hover:underline group-hover:text-blue-400 transition">
                      {blog.title}
                    </span>
                    <span className="ml-3 text-sm text-slate-400">
                      {blog.date}
                    </span>
                    {blog.description && (
                      <p className="mt-2 text-slate-600 italic">
                        {blog.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContainerBlock>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const slugs = getBlogSlugs();
  const blogs = slugs.map((slug) => {
    const { frontmatter } = getBlogBySlug(slug);
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
      description: frontmatter.description || "",
    };
  });
  // Sort by date descending
  blogs.sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    props: {
      blogs,
    },
  };
};

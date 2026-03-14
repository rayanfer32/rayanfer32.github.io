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
        <div className="max-w-4xl mx-auto bg-gray-100/80 text-zinc-700 dark:bg-zinc-500/10 dark:text-gray-300 rounded-2xl shadow-xl p-8 ">
          <h1 className="text-4xl font-extrabold mb-10 drop-shadow-sm">
            Read my blog
          </h1>
          <ul className="space-y-8">
            {blogs.map((blog) => (
              <li key={blog.slug} className="transition hover:scale-[1.02]">
                <Link href={`/blog/${blog.slug}`}>
                  <div className="cursor-pointer group">
                    <span className="sm:text-2xl text-xl text-ellipsis leading-1 tracking-tight font-bold dark:text-teal-500 group-hover:underline group-hover:text-blue-500 transition">
                      {blog.title}
                    </span>
                    <span className="ml-3 text-sm dark:text-slate-200">
                      {blog.date}
                    </span>
                    {blog.description && (
                      <p className="mt-2 text-slate-400 italic">
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
  blogs.sort((a, b) => (a.date > b.date ? 1 : -1));
  return {
    props: {
      blogs,
    },
  };
};

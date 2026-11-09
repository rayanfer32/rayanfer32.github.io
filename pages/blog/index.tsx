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
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl text-zinc-800 dark:text-zinc-200 rounded-3xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-8 sm:p-12">
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

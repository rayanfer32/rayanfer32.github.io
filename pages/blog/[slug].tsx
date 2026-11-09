import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBlogSlugs, getBlogPost } from "../../lib/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import ContainerBlock from "@components/ContainerBlock";

type BlogProps = {
  frontmatter: { [key: string]: any };
  content: string;
};

export default function BlogPost({ frontmatter, content }: BlogProps) {
  return (
    <ContainerBlock>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description || ""} />
      </Head>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl text-zinc-800 dark:text-zinc-200 rounded-3xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-10 md:p-14 transition-colors">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mb-6 group transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">&larr;</span>
            <span className="group-hover:underline">Back to all posts</span>
          </Link>

          <header className="mb-8 border-b border-zinc-200/80 dark:border-zinc-800 pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-zinc-900 dark:text-zinc-50 leading-tight">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              {frontmatter.date && (
                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {frontmatter.date}
                </span>
              )}
            </div>
            {frontmatter.description && (
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 italic border-l-4 border-teal-500/80 pl-4 my-3 leading-relaxed">
                {frontmatter.description}
              </p>
            )}
          </header>

          <article className="prose prose-slate prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypePrism]}
              components={{
                p: ({ children }) => (
                  <p className="my-5 leading-relaxed text-base sm:text-lg text-zinc-700 dark:text-zinc-300">
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl font-extrabold mt-10 mb-4 tracking-tight text-zinc-900 dark:text-zinc-50">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl font-semibold mt-7 mb-3 text-zinc-800 dark:text-zinc-200">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-teal-500 bg-teal-50/70 dark:bg-teal-950/20 text-zinc-800 dark:text-zinc-200 p-4 sm:p-5 my-6 rounded-r-xl shadow-xs leading-relaxed">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-6 my-4 space-y-2 text-zinc-700 dark:text-zinc-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed pl-1">{children}</li>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-left text-sm sm:text-base">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-semibold">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 bg-white dark:bg-zinc-900/40">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-xs sm:text-sm uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3.5 text-zinc-700 dark:text-zinc-300 align-top leading-relaxed">
                    {children}
                  </td>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="mx-auto rounded-2xl my-8 max-w-full h-auto shadow-md border border-zinc-200/80 dark:border-zinc-800"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-teal-600 dark:text-teal-400 font-medium hover:underline hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-8 border-t border-zinc-200 dark:border-zinc-800" />
                ),
                pre: ({ className, children, ...props }) => (
                  <pre
                    className={`${className || ""} overflow-x-auto p-4 sm:p-5 rounded-2xl bg-zinc-900 dark:bg-black/80 text-zinc-100 font-mono text-sm leading-relaxed border border-zinc-800 shadow-md whitespace-pre my-6`}
                    {...props}
                  >
                    {children}
                  </pre>
                ),
                code({ className, children, ...props }) {
                  const isBlock = className && className.startsWith("language-");
                  if (!isBlock) {
                    return (
                      <code
                        className="rounded-md bg-zinc-100 dark:bg-zinc-800 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 font-mono text-sm border border-zinc-200/70 dark:border-zinc-700/60"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className={`${className || ""} font-mono text-sm leading-relaxed`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </ContainerBlock>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getBlogSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { frontmatter, content } = await getBlogPost(slug);
  return {
    props: {
      frontmatter,
      content,
    },
  };
};

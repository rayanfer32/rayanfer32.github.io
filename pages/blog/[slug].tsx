import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getBlogSlugs, getBlogPost } from "../../lib/blogs";
import ReactMarkdown from "react-markdown";
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
      <div className="lg:w-2/3 max-w-5xl mx-auto bg-gray-700/10 shadow-lg p-8 ">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-sm">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm text-slate-500">{frontmatter.date}</span>
          {frontmatter.description && (
            <span className="text-slate-400 text-base italic">
              {frontmatter.description}
            </span>
          )}
        </div>
        <article className="prose prose-slate prose-lg max-w-none prose-pre:bg-slate-900 prose-pre:text-white prose-code:font-mono prose-code:text-pink-400 prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:p-4 [&>*]:my-8">
          <ReactMarkdown
            rehypePlugins={[rehypePrism]}
            components={{
              p: ({ children }) => (
                <p className="my-8 leading-relaxed text-lg">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold my-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold my-5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium my-4">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-400 text-gray-700 bg-blue-200 p-2">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside my-4">{children}</ol>
              ),
              li: ({ children }) => <li className="my-2">{children}</li>,
              img: ({ src, alt }) => (
                // <div className="place-items-center">
                <img
                  src={src}
                  alt={alt}
                  className="mx-auto rounded-lg my-6 max-w-full h-auto outline outline-4 outline-offset-4 outline-gray-600 shadow-lg"
                />
                // </div>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8" />,
              code({ className, children, ...props }) {
                const isBlock = className && className.startsWith("language-");
                if (!isBlock) {
                  return (
                    <code
                      className="rounded bg-indigo-100 text-indigo-900 px-2 py-1 font-mono text-base"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
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

import fs from "fs";
import path from "path";
import matter from "gray-matter";


const blogsDirectory = path.join(process.cwd(), "blogs");

export function getBlogSlugs(): string[] {
  return fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getBlogBySlug(slug: string) {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}

export async function getBlogPost(slug: string) {
  const { frontmatter, content } = getBlogBySlug(slug);
  return { frontmatter, content }; // Return raw markdown for react-markdown
}

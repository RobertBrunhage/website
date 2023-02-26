import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import { visit } from "unist-util-visit";

const root = process.cwd();

const tokenClassNames = {
  tag: "text-code-red",
  "attr-name": "text-code-yellow",
  "attr-value": "text-code-green",
  deleted: "text-code-red",
  inserted: "text-code-green",
  punctuation: "text-code-white",
  keyword: "text-code-purple",
  string: "text-code-green",
  function: "text-code-blue",
  boolean: "text-code-red",
  comment: "text-gray-400 italic",
};

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, "data", type));
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a, b) {
  return new Date(a) < new Date(b) ? 1 : -1;
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        import("remark-slug"),
        import("remark-autolink-headings"),
        import("remark-code-titles"),
        import("remark-math"),
        import("remark-mdx-images"),
      ],
      inlineNotes: true,
      rehypePlugins: [
        import("rehype-katex"),
        import("@mapbox/rehype-prism"),
        () => {
          return (tree) => {
            visit(tree, "element", (node, _, __) => {
              let [token, type] = node.properties.className || [];
              if (token === "token") {
                node.properties.className = [tokenClassNames[type]];
              }
            });
          };
        },
      ],
    },
  });

  return {
    mdxSource,
    content,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "data", type));

  const allFrontMatter = [];

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, "data", type, file), "utf8");
    const { data } = matter(source);
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(file) });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}

export async function getCoursesFrontMatter(type) {
  const courses = fs.readdirSync(path.join(root, "data", type));

  const courseFrontMatter = [];

  courses.forEach((course) => {
    const source = fs.readFileSync(
      path.join(root, "data", `${type}/${course}`, "__index.mdx"),
      "utf-8"
    );
    const { data } = matter(source);
    if (data.draft !== true) {
      courseFrontMatter.push({ ...data, course, slug: formatSlug(course) });
    }
  });

  return courseFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}

export async function getCourseFrontMatter(course) {
  const courseFiles = fs.readdirSync(path.join(root, "data/courses/", course));

  const courseFrontMatter = [];

  courseFiles.forEach((md) => {
    const source = fs.readFileSync(
      path.join(root, `data/courses/${course}/${md}`),
      "utf8"
    );
    const { data } = matter(source);
    if (data.draft !== true) {
      courseFrontMatter.push({ ...data, slug: formatSlug(md) });
    }
  });

  return courseFrontMatter;
}

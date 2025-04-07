"use server";
import { CreateArticleType } from "@/types";
import fs from "fs/promises";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
import path from "path";
import { z } from "zod";

const postDirectory = path.join(process.cwd(), "content");

const PostSchema = z.object({
    title: z.string().min(5).max(65),
    description: z.string(),
    publishedAt: z.coerce.string(),
    published: z.boolean().optional().default(false),
});

export type Post = z.infer<typeof PostSchema> & {
    slug: string;
    content: string;
};

export const getPosts = async () => {
    console.log("Page rendered or re-generated");

    const files = await fs.readdir(postDirectory);
    const fileNames = files.filter(
        (f) => f.endsWith(".txt") || f.endsWith(".mdx")
    );
    const posts: Post[] = [];
    for await (const fileName of fileNames) {
        const fullPath = path.join(postDirectory, fileName);
        const fileContent = await fs.readFile(fullPath, "utf-8");
        const frontmatter = matter(fileContent);
        const safeData = PostSchema.safeParse(frontmatter.data);
        if (!safeData.success) {
            console.error(`erreur de parsing du fichier ${fileName} `);
            safeData.error.issues.forEach((issue) => {
                console.error(
                    ` -${issue.path.join(" -> ")}: ${issue.message} `
                );
            });
            continue;
        }

        if (!safeData.data.published && process.env.NODE_ENV === "production") {
            continue;
        }
        posts.push({
            ...safeData.data,
            slug: fileName.replace(/^\d+-/, "").replace(".mdx", ""),
            content: frontmatter.content,
        });
    }

    return posts;
};

export const getPost = async (slug: string) => {
    const posts = await getPosts();
    return posts.find((post) => post.slug === slug);
};

export const createPost = async (data: CreateArticleType) => {
    console.log(data);
    const fileName = `${data.title.replace(/\s+/g, "-").toLowerCase()}.mdx`; // Crée un nom de fichier unique basé sur le titre
    const filePath = path.join(postDirectory, fileName);
    try {
        // Crée le répertoire si nécessaire
        console.log('creation ..')
        await fs.mkdir(postDirectory, { recursive: true });

        const content = [
            "---",
            `title: ${data.title}`,
            `description: ${data.description}`,
            `publishedAt: ${data.publishedAt}`,
            `published: ${data.published}`,
            "---",
            "",
            data.content,
          ].join("\n");
        await fs.writeFile(filePath, content);
        console.log(`Fichier créé avec succès : ${filePath}.mdx`);
        await revalidatePostsPage();
    } catch (error) {
        console.error("Erreur lors de la création du fichier:", error);
    }
};


export const revalidatePostsPage = async () => {
    try {
        // Utilisation de l'API `revalidatePath` de Next.js pour revalider la page des posts
        revalidatePath("/posts");
        console.log("Page revalidée avec succès.");
    } catch (error) {
        console.error("Erreur lors de la revalidation de la page:", error);
    }
};

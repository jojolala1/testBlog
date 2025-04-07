import { Mdx } from "@/features/mdx/Mdx";
import { getPost, getPosts, Post } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await getPost(slug);
    if (!post) {
        return {
            title: "404",
            description: "Page non trouvée",
        };
    }
    return {
        title: post.title,
        description: post.description,
    };

}
export async function generateStaticParams() {
    // Récupérer tous les articles
    const posts: Post[] = await getPosts();

    return posts.map((post) => ({
        slug: post.slug, // Génère un slug pour chaque article
    }));
}

export default async function RoutePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await getPost(slug);
    console.log('post : ', post);

    if (!post) {
        return notFound();
    }
    return (
        <div className="prose prose-sm lg:prose:lg">
            <p className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <h1>{post.title}</h1>
            <Mdx>{post.content}</Mdx>
        </div>
    );
}

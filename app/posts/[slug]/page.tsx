import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export const generateMetadata = async ({
    params
}: {params: Promise<{slug: string}>}) => {
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
};

export default async function RoutePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await getPost(slug);

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

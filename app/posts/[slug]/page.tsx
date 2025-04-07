import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";


export const dynamique = 'force-static';

export const generateMetadata = async(props:{
    params:  {slug: string};
    
}): Promise<Metadata>=>{
    const post = await getPost(props.params.slug);
    if(!post){
        return {
            title: '404',
            description: 'Page non trouvée',
        }
    }
    return {
        title: post.title,
        description: post.description,    
    }
}

export default async function RoutePage(props: { params: { slug: string } }) {
    const post = await getPost(props.params.slug);

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

"use client"
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createPost, getPosts, Post } from "@/lib/posts";
import { CreateArticleSchema, CreateArticleType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";





export default function Home() {

    const [posts, setPosts] = useState<Post[]>([])
   
    
    const form = useForm<CreateArticleType>({
        resolver: zodResolver(CreateArticleSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            published: false,
            publishedAt: new Date(),
            slug:""
        },
    });
    
    // 2. Define a submit handler.
    async function onSubmit  (values: CreateArticleType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        await createPost(values)
    }
    useEffect(()=>{
        const handleGetPosts = async ()=>{
            const posts = await getPosts();
            setPosts(posts);
        }
        handleGetPosts();
    },[])
    return (
        <div className="list-inside list-disc flex flex-col gap-5">


<FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 m-10 mt-20"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="titre.."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="slug.."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="description.."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contenu</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="contenu.."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Publier</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Poster</Button>
                    </form>
                </FormProvider>
                <Posts posts={posts} />
        </div>
    );
}

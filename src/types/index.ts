import { z } from "zod";

export const CreateArticleSchema = z.object({
    title: z.string().min(3, {
        message: "il faut au minimum 3 caracteres",
    }),
    
    description: z.string().min(3, {
        message: "il faut au minimum 3 caracteres",
    }),
    content: z.string().min(10, {
        message: "il faut au minimum 10 caracteres",
    }),
    
    published: z.boolean(),
    publishedAt: z.date(),
    slug:z.string(),
});

export type CreateArticleType = z.infer<typeof CreateArticleSchema>;
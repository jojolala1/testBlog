import Link from 'next/link';
import { CreateArticleType } from '../../app/page';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';


type Posts = Omit<CreateArticleType, 'publishedAt'> & {
    publishedAt: string; // Remplacement de `publishedAt` par `string`
  };
const Posts = ({posts}:{posts:Posts[]}) => {

  return (
    <>
    {posts.map((post, index) => (
        <Card key={index}>
            <CardHeader>
                <p className="text-xs text-muted-foreground">{
                    new Date(post.publishedAt).toLocaleDateString()
                    }</p>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardHeader>

            <CardFooter>
                <Link className="text-blue-500 hover:underline" href={`/posts/${post.slug}`}>
                    Lire
                </Link>
            </CardFooter>
        </Card>
    ))}
    </>
  )
}

export default Posts
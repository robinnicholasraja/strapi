import { getAllTags, getPostByTags } from "@/query/data"
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getArticleId(slug:string) {
  const {post: allTags} = await getAllTags(); 
  const article = allTags.tags.data.find((article:any) => {
    return article.slug === slug
  })
  return article.id;
}

export default async function Page({ params }: { params: { slug: string } }) {  
  const id = await getArticleId(params.slug);
  const {post:tagData} = await getPostByTags(id);
  revalidatePath("/know-more/category/[slug]", "page");
  
  const posts = tagData.tag.articles.data.map((article:any) => {
    const transformedArrays = article.relatedTags.data.map((tagArray:any) => tagArray.name)
    return {
      title: article.title,
      description: article.description[0].children[0].text,
      tags: transformedArrays,
      slug: article.slug
    }
  })
  

  return <section className="p-24">
    <div className="container">
      <h1>Showing post from: {tagData.tag.name}</h1>
      <div className="flex gap-20 flex-wrap mt-5">
        
      { posts.length > 0 ?
      posts.map((post:any) => {
        return <div key={post.title} className="p-5 border w-80">
          <Link href={`/know-more/${post.slug}`} className="uppercase font-bold mb-2">{post.title}</Link>
          <p>{post.description}</p>
          <div className="flex flex-wrap gap-4 mt-5">
            {post.tags.map((tag:any) => {
              const slug = tag.split(" ").join("-").toLowerCase()
              return <Link href={slug} key={tag} className="text-center px-2 py-1 w-20 rounded-full bg-gray-300 text-sm">{tag}</Link>
            })}
          </div>
        </div>
      }) : <h2 className="text-4xl"> No post found! </h2>}
      </div>
    </div>
  </section>
}
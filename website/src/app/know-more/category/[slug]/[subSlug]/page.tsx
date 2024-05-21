import { getArticleFromSubTag } from "@/query/data";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";



async function getArticleBySubTag(slug:string) {
  const {post: allSubTags} = await getArticleFromSubTag();
  const subTagId = allSubTags.subtags.data.find((subtag:any) => {
    return subtag.slug === slug
  })  
  return subTagId.articles.data
}

export default async function Page({ params }: { params: { subSlug: string } }) {
  const articles = await getArticleBySubTag(params.subSlug)
  const articleData = articles.map((article:any) => {
    return {
      title: article.title,
      description: article.description[0].children[0].text,
      slug: article.slug
    }
  })

  
  return <section className="p-24">
    <div className="container">
      <ul className="flex gap-20 flex-wrap mb-10">
      {articleData.map(({title,description,slug}:any) => {
        return <li className="p-5 border w-80" key={title}><Link className="text-xl text-blue-500 font-bold" href={`/know-more/${slug}`}>{title}</Link>
        <p className="my-4">{description}</p>
        <Link className="text-center px-2 py-1 w-20 rounded-full bg-gray-300 text-sm" href="/know-more">{params.subSlug}</Link>
        </li>
    })}
    </ul>
    <Link className="px-4 py-2 bg-black text-white rounded-sm" href="/know-more">Know more</Link>
    </div>
  </section>
}
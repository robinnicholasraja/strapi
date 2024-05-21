import { getAllArticles, getArticle, getArticleSeo, getDraftArticleId, getRelatedArticle } from "@/query/data";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import CommentBox from "@/components/CommentBox";
import { draftMode } from "next/headers";

export async function generateMetadata({ params }:{params:any}): Promise<Metadata> {
 const id = await getId(params.slug);
 const {post} = await getArticleSeo(id);
 const title = post.article.seo.metaTitle;
 const description = post.article.seo.metaDescription;

  return {
    title: title,
    description: description
  }
}

async function getId(slug:any) {
  const { isEnabled } = draftMode();
  const id = isEnabled ? await getDraftId() : await getArticleId(slug)
  return id;
}

async function getArticleId(slug:string) {
  try {
    const {post: allArticles} = await getAllArticles();
    const article = allArticles.articles.data.find((article:any) => {
      return article.slug === slug
    })
    return article.id;
  }catch(err) {
   notFound();
  }
}

async function getDraftId() {
  try {
    const {post:draftArticle}:any = await getDraftArticleId();
    return draftArticle.articles.data[0].id;
  }catch(err) {
    notFound();
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const id = await getId(params.slug);
  const { isEnabled } = draftMode();
  const {post: articleData} =  await getArticle(id);
  const {post: RelatedArticleData} = await getRelatedArticle(id);

  const relatedArticles = RelatedArticleData.article.RelatedArticles.data.map((article:any) => {
    return {
      title: article.title,
      description: article.description[0].children[0].text,
      slug: article.slug,
      tags: [{name: article.relatedTags.data[0].name, slug: article.relatedTags.data[0].slug}]
    }
  })
  
  revalidatePath("/know-more/[slug]", "page");
  
  const {title,description} = articleData.article;
  console.log(description);
  
  
  
  return <main>
    <section className="p-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <BlocksRenderer content={description} />
        <Link className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-sm" href="/know-more">Know more</Link>
        {isEnabled && <div className="mt-3 p-3 bg-red-200 rounded-md">
          <p>You are in draft mode <Link className="text-red-600" href="/api/disable-draft" prefetch={false}>Click here</Link> to turn off.</p>
        </div>}
      </div>
    </section>
    <section className="p-12">
      <div className="container">
        <h3 className="font-bold text-2xl">Post a comment</h3>
        <CommentBox articleId={id} />
      </div>
    </section>
    <section className="p-12">
      <div className="container">
        <h2 className="font-bold mb-3 text-3xl">Related Articles</h2>
        <ul className="flex gap-20 flex-wrap">
          {relatedArticles.map((article:any) => {
            return <li className="p-5 border w-80" key={article.title}>
              <Link className="text-blue-600 font-bold" href={article.slug}>{article.title}</Link>
              <p>{article.description}</p>
              <div className="flex flex-wrap gap-4 mt-5">
                {article.tags.map((tag:any) => {
                  return <Link className="text-center px-2 py-1 w-20 rounded-full bg-gray-300 text-sm" key={tag.slug} href={tag.slug}>{tag.name}</Link>
                })}
              </div>
            </li>
          })}
        </ul>
      </div>
    </section>
  </main>
}
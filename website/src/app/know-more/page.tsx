import Tags from "@/components/Tags";
import { BASE_URL } from "@/constants";
import { getAllArticles, getAllTags, getHeroDetails } from "@/query/data";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

type ImageProps = {
  name: string
  alternativeText: string
  url: string;
  width: number;
  height: number;
}

type Blocks = {
  __typename: string;
  heading: string;
  subHeading: string;
  image: ImageProps;
}

export default async function KnowMore() {
  const { post: heroDetails } = await getHeroDetails();
  const { post: articleDetails } = await getAllArticles();
  const { post: tagDetails } = await getAllTags();
  revalidatePath('/know-more', 'page');
  const {heading, subHeading, image}: Blocks = heroDetails.homePage.blocks[0];
  const articles = articleDetails.articles.data
  const articleData = articles.map((article:any) => {
    const transformedArrays = article.relatedTags.data.map((tagArray:any) => tagArray.name)
    return {
      title: article.title,
      description: article.description[0].children[0].text,
      tags: transformedArrays,
      slug: article.slug,
    }
  })
  
  
  const tags = tagDetails.tags.data.map((tag:any) => {
    const subtags = tag.subtags?.data?.map((subtag:any) => ({
      name: subtag.name,
      slug: subtag.slug
    })) || [];
    
    return {
      name: tag.name,
      slug: tag.slug,
      subTag: subtags
    }
  });

  

  return (
    <main>
      <section className="flex flex-col items-center justify-between p-12">
        <div className="container flex">
          <div>
            <h1>{heading}</h1>
            <p>{subHeading}</p>
          </div>
          <Image width={image.width} height={image.height} src={`${BASE_URL}${image.url}`} alt="Decorative image"/>
        </div>
      </section>
      <section className="p-12">
        <div className="container">
          <ul className="flex flex-wrap mb-5 gap-5">
          <li className="flex"><Link className="px-4 py-2 bg-black text-white rounded-sm" href="/know-more">All</Link></li>
            {tags.map((tag:any) => {
              return <Tags key={tag.name} data={tag}/>
            })}
          </ul>
          <div className="flex gap-20 flex-wrap">
            {articleData.map((article:any) => {
              return (<div key={article.title} className="p-5 border w-80">
                <Link href={`/know-more/${article.slug}`} className="uppercase font-bold mb-2">{article.title}</Link>
                <p>{article.description}</p>
                <div className="flex flex-wrap gap-4 mt-5">
                  {article.tags.map((tag:any) => {
                    const matchingTag = tags.find((currentTag:any) => currentTag.name === tag);
                    return  <Link href={`/know-more/category/${matchingTag.slug}`} key={tag} className="text-center px-2 py-1 w-20 rounded-full bg-gray-300 text-sm">{tag}</Link> 
                  }
                  )}
                </div>
              </div>)
            })}
            {/* <Link target={`${isExternal ? "_blank" : "_self"}`} className="px-4 py-2 bg-black text-white rounded-sm" href={`/know-more${url}`}>{text}</Link> */}
          </div>
        </div>
      </section>
    </main>
  );
}

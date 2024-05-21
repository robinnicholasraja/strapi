
import { gql } from "@apollo/client";

export const GET_HERO_QUERY = gql`
query {
  homePage {
    data {
      attributes {
       	 blocks {
          __typename 
          ... on ComponentLayoutHeroSection {
            heading,
            subHeading,
            image {
              data {
                attributes {
                  name,
                  alternativeText
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_LINK_COMPONENT_QUERY = gql`
query {
  homePage {
    data {
      attributes {
       	 blocks {
          __typename 
          ... on  ComponentComponentsLink{
            url,
            text,
            isExternal
          }
        }
      }
    }
  }
}
`;


export const GET_SUBPAGE = gql`
query {
	subPage1 {
    data {
      attributes {
        hero {
          heading
          subHeading
          image {
            data {
              attributes {
                width
                height
                name
                alternativeText
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_ALL_ARTICLES = gql`
query {
  articles {
    data {
      id
      attributes {
        title
        description
        relatedTags {
          data {
            attributes {
              name
            }
          }
        }
        subtags {
          data {
            attributes {
              name
              slug
            }
          }
        }
        slug 
      }
    }
  }
}
`;

export const GET_ALL_TAGS = gql`
query {
  tags {
    data {
      id
      attributes {
        name
        slug
        subtags {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
    }
  }
}
`;

export const GET_POST_BY_TAGS = gql`
query GetPost($id: ID){
  tag(id: $id) {
    data {
      attributes {
        name
        articles {
          data {
            attributes {
              title
              description
              slug
              relatedTags {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_ARTICLE = gql`
query GetArticle($id: ID) {
  article(id: $id) {
    data {
      attributes {
        title
        description
      }
    }
  }
}
`;

export const GET_RELATED_ARTICLE = gql`
query GetRelatedArticle($id: ID) {
  article(id: $id) {
    data {
      attributes {
				RelatedArticles {
          data {
            attributes {
              title
              description
              slug
              relatedTags {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_ARTICLE_SEO = gql`
query GetArticle($id: ID) {
  article(id: $id) {
    data {
      attributes {
        seo {
          metaTitle
          metaDescription
        }
      }
    }
  }
}
`;


export const GET_ARTICLE_BY_SLUG = gql`
query pages($slug:String) {
  articles(filters:{slug:{eq:$slug}}) {
      data {
          attributes {
              title
              slug
          }
      }
  }
}
`;

export const GET_DRAFT_ARTICLE_ID = gql`
query pages {
  articles(publicationState:PREVIEW filters:{and:[
    {publishedAt: {null: true}}
  ]}) {
      data {
          id
      }
  }
}
`;

export const GET_ARTICLE_FROM_SUBTAG = gql`
query {
  subtags {
    data {
      id
      attributes {
        slug
        articles {
          data {
            attributes {
              title
              description
              slug
            }
          }
        }
      }
    }
  }
}
`;
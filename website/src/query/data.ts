import { apolloClient } from "@/lib/apollo-client";
import { GET_ALL_ARTICLES, GET_ALL_TAGS, GET_ARTICLE, GET_ARTICLE_BY_SLUG, GET_ARTICLE_FROM_SUBTAG, GET_ARTICLE_SEO, GET_DRAFT_ARTICLE_ID, GET_HERO_QUERY, GET_LINK_COMPONENT_QUERY, GET_POST_BY_TAGS, GET_RELATED_ARTICLE } from "./schema";
import { flattenAttributes } from "@/lib/utils";

export const getHeroDetails = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_HERO_QUERY,
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getArticleFromSubTag = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ARTICLE_FROM_SUBTAG,
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getLinkDetails = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_LINK_COMPONENT_QUERY,
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getAllArticles = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ALL_ARTICLES
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by all articles ${e}`);
    }
};

export const getAllTags = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ALL_TAGS
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getPostByTags = async (id: number) => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_POST_BY_TAGS,
            variables: {
                id: id,
            },
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getArticle = async (id: number) => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ARTICLE,
            variables: {
                id: id,
            },
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by id ${e}`);
    }
};

export const getDraftArticleId = async () => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_DRAFT_ARTICLE_ID,
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getRelatedArticle = async (id: number) => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_RELATED_ARTICLE,
            variables: {
                id: id,
            },
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching related article by id ${e}`);
    }
};

export const getArticleBySlug = async (slug: string) => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ARTICLE_BY_SLUG,
            variables: {
                slug: slug
            },
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog by slug ${e}`);
    }
};

export const getArticleSeo = async (id: number) => {
    try {
        const { data: _data } = await apolloClient.query({
            query: GET_ARTICLE_SEO,
            variables: {
                id: id,
            },
        });
        const data = flattenAttributes(_data);
        return {
            post: data
        };
    } catch (e) {
        throw new Error(`Error while fetching Blog seo by id ${e}`);
    }
};
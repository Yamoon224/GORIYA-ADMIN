import { apiRequest } from "@/lib/api-client-http"
import { IPaginatedResponse } from "@/lib/@types/api"

export interface IArticle {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    authorName: string | null
    status: "DRAFT" | "PUBLISHED"
    publishedAt: string | null
    createdAt: string
    updatedAt: string
}

export const articleService = {
    getArticles: async (filters?: { page?: number; limit?: number }) => {
        return apiRequest<IPaginatedResponse<IArticle>>({
            endpoint: "/admin/articles/paginate",
            method: "GET",
            params: filters,
        })
    },

    createArticle: async (data: FormData) => {
        return apiRequest<IArticle>({
            endpoint: "/articles",
            method: "POST",
            data,
        })
    },

    updateArticle: async (id: string, data: FormData) => {
        data.append("_method", "PATCH")
        return apiRequest<IArticle>({
            endpoint: `/articles/${id}`,
            method: "POST",
            data,
        })
    },

    deleteArticle: async (id: string) => {
        return apiRequest<{ message: string }>({
            endpoint: `/articles/${id}`,
            method: "DELETE",
        })
    },
}

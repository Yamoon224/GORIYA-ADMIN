import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IPortfolio } from "@/lib/@types/entities"

export const portfolioService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            totalPortfolios: number
            totalViews: number
            totalDownloads: number
            totalLikes: number
        }>>({
            endpoint: "/portfolios/stats",
            method: "GET",
        })
    },

    getPortfolios: async (params?: { page?: number; limit?: number; category?: string; search?: string }) => {
        return apiRequest<IPaginatedResponse<IPortfolio>>({
            endpoint: "/portfolios/paginate",
            method: "GET",
            params,
        })
    },

    getFeaturedPortfolios: async () => {
        return apiRequest<ApiResponse<IPortfolio[]>>({
            endpoint: "/portfolios/featured",
            method: "GET",
        })
    },

    getPortfolioById: async (id: string) => {
        return apiRequest<ApiResponse<IPortfolio>>({
            endpoint: `/portfolios/${id}`,
            method: "GET",
        })
    },

    getPopularCategories: async () => {
        return apiRequest<ApiResponse<Array<{ name: string; count: number }>>>({
            endpoint: "/portfolios/categories",
            method: "GET",
        })
    },

    featurePortfolio: async (id: string, featured: boolean) => {
        return apiRequest<ApiResponse<IPortfolio>>({
            endpoint: `/portfolios/${id}/feature`,
            method: "PATCH",
            data: { featured },
        })
    },

    deletePortfolio: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/portfolios/${id}`,
            method: "DELETE",
        })
    },
}

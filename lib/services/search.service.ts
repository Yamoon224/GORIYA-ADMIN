import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IUser, IJobOffer } from "@/lib/@types/entities"

export type SearchResultType = "candidate" | "offer" | "all"

export interface ISearchFilters {
    type?: SearchResultType
    location?: string
    experience?: string
    minScore?: number
    sector?: string
    page?: number
    limit?: number
}

export const searchService = {
    search: async (query: string, filters?: ISearchFilters) => {
        return apiRequest<IPaginatedResponse<IUser | IJobOffer>>({
            endpoint: "/search",
            method: "GET",
            params: { q: query, ...filters },
        })
    },

    searchCandidates: async (query: string, filters?: Omit<ISearchFilters, "type">) => {
        return apiRequest<IPaginatedResponse<IUser>>({
            endpoint: "/search/candidates",
            method: "GET",
            params: { q: query, ...filters },
        })
    },

    searchOffers: async (query: string, filters?: Omit<ISearchFilters, "type">) => {
        return apiRequest<IPaginatedResponse<IJobOffer>>({
            endpoint: "/search/offers",
            method: "GET",
            params: { q: query, ...filters },
        })
    },

    getAdvancedFilters: async () => {
        return apiRequest<ApiResponse<{
            sectors: string[]
            locations: string[]
            experiences: string[]
        }>>({
            endpoint: "/search/filters",
            method: "GET",
        })
    },

    exportResults: async (query: string, filters?: ISearchFilters) => {
        return apiRequest<Blob>({
            endpoint: "/search/export",
            method: "GET",
            params: { q: query, ...filters, format: "csv" },
        })
    },
}

import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"
import { ICandidature } from "@/lib/@types/entities"
import { CandidatureStatus } from "@/lib/@types/enums"

export const candidatureService = {
    getCandidatures: async (params?: { page?: number; limit?: number; status?: CandidatureStatus }) => {
        return apiRequest<IPaginatedResponse<ICandidature>>({
            endpoint: "/candidatures/paginate",
            method: "GET",
            params,
        })
    },

    getCandidatureById: async (id: string) => {
        return apiRequest<ApiResponse<ICandidature>>({
            endpoint: `/candidatures/${id}`,
            method: "GET",
        })
    },

    getStats: async () => {
        return apiRequest<ApiResponse<{
            total: number
            enAttente: number
            enCours: number
            approuvees: number
            rejetees: number
        }>>({
            endpoint: "/candidatures/stats",
            method: "GET",
        })
    },

    updateCandidatureStatus: async (id: string, status: CandidatureStatus) => {
        return apiRequest<ApiResponse<ICandidature>>({
            endpoint: `/candidatures/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },

    withdrawCandidature: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/candidatures/${id}`,
            method: "DELETE",
        })
    },
}

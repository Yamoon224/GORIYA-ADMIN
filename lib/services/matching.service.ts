import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IMatchingResult } from "@/lib/@types/entities"
import { MatchingStatus } from "@/lib/@types/enums"

export const matchingService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            totalMatches: number
            averageScore: number
            successRate: number
            pendingMatches: number
        }>>({
            endpoint: "/matching/stats",
            method: "GET",
        })
    },

    getRecentMatches: async (params?: { page?: number; limit?: number; status?: MatchingStatus }) => {
        return apiRequest<IPaginatedResponse<IMatchingResult>>({
            endpoint: "/matching/recent",
            method: "GET",
            params,
        })
    },

    getAlgorithmPerformance: async () => {
        return apiRequest<ApiResponse<{
            precision: number
            recall: number
            f1Score: number
            algorithms: Array<{ name: string; accuracy: number }>
        }>>({
            endpoint: "/matching/algorithms",
            method: "GET",
        })
    },

    getActivityFeed: async () => {
        return apiRequest<ApiResponse<Array<{
            id: string
            type: string
            message: string
            timestamp: string
        }>>>({
            endpoint: "/matching/activity",
            method: "GET",
        })
    },

    triggerMatching: async (candidateId: string, jobOfferId: string) => {
        return apiRequest<ApiResponse<IMatchingResult>>({
            endpoint: "/matching/trigger",
            method: "POST",
            data: { candidateId, jobOfferId },
        })
    },

    updateMatchStatus: async (id: string, status: MatchingStatus) => {
        return apiRequest<ApiResponse<IMatchingResult>>({
            endpoint: `/matching/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },
}

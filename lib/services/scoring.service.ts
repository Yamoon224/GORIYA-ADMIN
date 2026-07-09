import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IScoringResult } from "@/lib/@types/entities"
import { ScoringStatus } from "@/lib/@types/enums"

export interface IScoringCriteria {
    name: string
    weight: number
    score: number
    maxScore: number
}

export const scoringService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            generatedScores: number
            averageScore: number
            accuracy: number
            averageTime: string
        }>>({
            endpoint: "/admin/scoring/stats",
            method: "GET",
        })
    },

    getScoringCriteria: async () => {
        return apiRequest<ApiResponse<IScoringCriteria[]>>({
            endpoint: "/admin/scoring/criteria",
            method: "GET",
        })
    },

    getAlgorithmPerformance: async () => {
        return apiRequest<ApiResponse<{
            precision: number
            recall: number
            f1Score: number
            trendData: Array<{ month: string; precision: number; recall: number }>
        }>>({
            endpoint: "/admin/scoring/performance",
            method: "GET",
        })
    },

    getRecentAnalyses: async (params?: { page?: number; limit?: number; status?: ScoringStatus }) => {
        return apiRequest<IPaginatedResponse<IScoringResult>>({
            endpoint: "/admin/scoring/recent",
            method: "GET",
            params,
        })
    },

    getScoringById: async (id: string) => {
        return apiRequest<ApiResponse<IScoringResult>>({
            endpoint: `/admin/scoring/${id}`,
            method: "GET",
        })
    },

    scoreCandidate: async (data: { candidateId: string; position: string }) => {
        return apiRequest<ApiResponse<IScoringResult>>({
            endpoint: "/admin/scoring/analyze",
            method: "POST",
            data,
        })
    },

    updateCriteria: async (criteria: IScoringCriteria[]) => {
        return apiRequest<ApiResponse<IScoringCriteria[]>>({
            endpoint: "/admin/scoring/criteria",
            method: "PATCH",
            data: { criteria },
        })
    },
}

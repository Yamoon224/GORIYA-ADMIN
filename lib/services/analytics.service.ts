import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse } from "@/lib/@types/api"

export const analyticsService = {
    getAnalytics: async () => {
        return apiRequest<ApiResponse<{
            analyzedCVs: number
            successfulInterviews: number
            matchingRate: number
            averageAnalysisTime: string
            evolutionData: Array<{ month: string; value: number }>
            activityDistribution: Array<{ name: string; value: number; color: string }>
        }>>({
            endpoint: "/analytics",
            method: "GET",
        })
    },

    getEvolutionData: async (period: "week" | "month" | "year") => {
        return apiRequest<ApiResponse<Array<{ month: string; value: number }>>>({
            endpoint: "/analytics/evolution",
            method: "GET",
            params: { period },
        })
    },

    getActivityDistribution: async () => {
        return apiRequest<ApiResponse<Array<{ name: string; value: number; color: string }>>>({
            endpoint: "/analytics/activity",
            method: "GET",
        })
    },

    getKPIs: async () => {
        return apiRequest<ApiResponse<{
            registrations: number
            matchingRate: number
            cvAnalyzed: number
            interviewsDone: number
        }>>({
            endpoint: "/analytics/kpis",
            method: "GET",
        })
    },

    exportReport: async (period: string) => {
        return apiRequest<Blob>({
            endpoint: "/analytics/export",
            method: "GET",
            params: { period, format: "pdf" },
        })
    },
}

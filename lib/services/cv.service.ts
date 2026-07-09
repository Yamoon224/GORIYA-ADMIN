import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"
import { ICVAnalysis } from "@/lib/@types/entities"
import { CVStatus } from "@/lib/@types/enums"

export const cvService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            totalAnalyzed: number
            completed: number
            analyzing: number
            failed: number
            averageScore: number
        }>>({
            endpoint: "/admin/cv-analysis/stats",
            method: "GET",
        })
    },

    getRecentAnalyses: async (params?: { page?: number; limit?: number; status?: CVStatus }) => {
        return apiRequest<IPaginatedResponse<ICVAnalysis>>({
            endpoint: "/admin/cv-analysis/recent",
            method: "GET",
            params,
        })
    },

    getAnalysisById: async (id: string) => {
        return apiRequest<ApiResponse<ICVAnalysis>>({
            endpoint: `/admin/cv-analysis/${id}`,
            method: "GET",
        })
    },

    getRecommendations: async () => {
        return apiRequest<ApiResponse<Array<{ category: string; suggestion: string; impact: string }>>>({
            endpoint: "/admin/cv-analysis/recommendations",
            method: "GET",
        })
    },

    analyzeCV: async (cvData: FormData) => {
        return apiRequest<ApiResponse<{
            score: number
            suggestions: string[]
            strengths: string[]
            improvements: string[]
        }>>({
            endpoint: "/admin/cv/analyze",
            method: "POST",
            data: cvData,
        })
    },

    uploadCV: async (file: File) => {
        const formData = new FormData()
        formData.append("cv", file)
        return apiRequest<ApiResponse<{ cvUrl: string }>>({
            endpoint: "/admin/cv/upload",
            method: "POST",
            data: formData,
        })
    },

    deleteAnalysis: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/admin/cv-analysis/${id}`,
            method: "DELETE",
        })
    },
}

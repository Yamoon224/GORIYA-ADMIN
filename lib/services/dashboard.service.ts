import { ApiResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"
import { ICandidature, IJobOffer } from "@/lib/@types/entities"

export const dashboardService = {
    getAdminStats: async () => {
        return apiRequest<ApiResponse<{
            activeStudents: number
            partnerCompanies: number
            analyzedCVs: number
            jobOffers: number
        }>>({
            endpoint: "/dashboard/stats",
            method: "GET",
        })
    },

    getPerformanceData: async (period?: string) => {
        return apiRequest<ApiResponse<Array<{ month: string; value: number; label?: string }>>>({
            endpoint: "/dashboard/performance",
            method: "GET",
            params: period ? { period } : undefined,
        })
    },

    getStats: async () => {
        return apiRequest<ApiResponse<{
            totalApplications: number
            interviews: number
            profileViews: number
            savedJobs: number
        }>>({
            endpoint: "/dashboard/stats",
            method: "GET",
        })
    },

    getRecentApplications: async (limit = 5) => {
        return apiRequest<ApiResponse<ICandidature[]>>({
            endpoint: "/dashboard/recent-applications",
            method: "GET",
            params: { limit },
        })
    },

    getRecommendedJobs: async (limit = 6) => {
        return apiRequest<ApiResponse<IJobOffer[]>>({
            endpoint: "/dashboard/recommended-jobs",
            method: "GET",
            params: { limit },
        })
    },

    getProfileViews: async (days = 30) => {
        return apiRequest<ApiResponse<{
            views: Array<{ date: string; count: number }>
            total: number
        }>>({
            endpoint: "/dashboard/profile-views",
            method: "GET",
            params: { days },
        })
    },
}

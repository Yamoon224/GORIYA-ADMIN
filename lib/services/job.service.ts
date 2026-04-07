import { apiRequest } from "@/lib/api-client-http"
import { ICandidature, IJobOffer } from "@/lib/@types/entities"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { JobStatus } from "@/lib/@types/enums"

export const jobService = {
    getJobs: async (filters?: {
        search?: string
        location?: string
        jobType?: string[]
        experience?: string[]
        salary?: string[]
        status?: JobStatus
        page?: number
        limit?: number
    }) => {
        return apiRequest<IPaginatedResponse<IJobOffer>>({
            endpoint: "/job-offers/paginate",
            method: "GET",
            params: filters,
        })
    },

    getJobById: async (id: string) => {
        return apiRequest<ApiResponse<IJobOffer>>({
            endpoint: `/job-offers/${id}`,
            method: "GET",
        })
    },

    getStats: async () => {
        return apiRequest<ApiResponse<{
            total: number
            active: number
            closed: number
            draft: number
            totalApplicants: number
        }>>({
            endpoint: "/job-offers/stats",
            method: "GET",
        })
    },

    getSectorDistribution: async () => {
        return apiRequest<ApiResponse<Array<{ name: string; count: number; percentage: number }>>>({
            endpoint: "/job-offers/sectors",
            method: "GET",
        })
    },

    createJobOffer: async (data: Partial<IJobOffer>) => {
        return apiRequest<ApiResponse<IJobOffer>>({
            endpoint: "/job-offers",
            method: "POST",
            data,
        })
    },

    updateJobOffer: async (id: string, data: Partial<IJobOffer>) => {
        return apiRequest<ApiResponse<IJobOffer>>({
            endpoint: `/job-offers/${id}`,
            method: "PATCH",
            data,
        })
    },

    updateJobStatus: async (id: string, status: JobStatus) => {
        return apiRequest<ApiResponse<IJobOffer>>({
            endpoint: `/job-offers/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },

    deleteJobOffer: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/job-offers/${id}`,
            method: "DELETE",
        })
    },

    applyToJob: async (jobId: string, applicationData: { coverLetter?: string; resumeUrl?: string }) => {
        return apiRequest<ApiResponse<ICandidature>>({
            endpoint: `/job-offers/${jobId}/apply`,
            method: "POST",
            data: applicationData,
        })
    },

    saveJob: async (jobId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/job-offers/${jobId}/save`,
            method: "POST",
        })
    },

    unsaveJob: async (jobId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/job-offers/${jobId}/save`,
            method: "DELETE",
        })
    },
}

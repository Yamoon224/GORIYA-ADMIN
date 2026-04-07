import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { ICompany, IJobOffer } from "@/lib/@types/entities"
import { CompanyStatus } from "@/lib/@types/enums"

export const companyService = {
    getCompanies: async (filters?: {
        search?: string
        industry?: string[]
        size?: string[]
        location?: string[]
        page?: number
        limit?: number
    }) => {
        return apiRequest<IPaginatedResponse<ICompany>>({
            endpoint: "/companies/paginate",
            method: "GET",
            params: filters,
        })
    },

    getCompanyById: async (id: string) => {
        return apiRequest<ApiResponse<ICompany>>({
            endpoint: `/companies/${id}`,
            method: "GET",
        })
    },

    getStats: async () => {
        return apiRequest<ApiResponse<{
            total: number
            active: number
            inactive: number
            newThisMonth: number
        }>>({
            endpoint: "/companies/stats",
            method: "GET",
        })
    },

    getSectorDistribution: async () => {
        return apiRequest<ApiResponse<Array<{ name: string; count: number; percentage: number }>>>({
            endpoint: "/companies/sectors",
            method: "GET",
        })
    },

    createCompany: async (data: Partial<ICompany>) => {
        return apiRequest<ApiResponse<ICompany>>({
            endpoint: "/companies",
            method: "POST",
            data,
        })
    },

    updateCompany: async (id: string, data: Partial<ICompany>) => {
        return apiRequest<ApiResponse<ICompany>>({
            endpoint: `/companies/${id}`,
            method: "PATCH",
            data,
        })
    },

    updateCompanyStatus: async (id: string, status: CompanyStatus) => {
        return apiRequest<ApiResponse<ICompany>>({
            endpoint: `/companies/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },

    deleteCompany: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/companies/${id}`,
            method: "DELETE",
        })
    },

    followCompany: async (companyId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/companies/${companyId}/follow`,
            method: "POST",
        })
    },

    unfollowCompany: async (companyId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/companies/${companyId}/follow`,
            method: "DELETE",
        })
    },

    getRecruitingCompanies: async () => {
        return apiRequest<ApiResponse<ICompany[]>>({
            endpoint: "/companies/paginate",
            method: "GET",
        })
    },

    getCompanyJobs: async (companyId: string) => {
        return apiRequest<ApiResponse<IJobOffer[]>>({
            endpoint: `/companies/${companyId}/jobs`,
            method: "GET",
        })
    },
}

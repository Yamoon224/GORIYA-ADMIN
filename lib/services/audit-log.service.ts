import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IAuditLog } from "@/lib/@types/entities"

export interface IAuditLogFilters {
    page?: number
    limit?: number
    search?: string
    userId?: string
    action?: string
    auditableType?: string
    auditableId?: string
    dateFrom?: string
    dateTo?: string
}

export const auditLogService = {
    paginate: async (filters?: IAuditLogFilters) => {
        return apiRequest<IPaginatedResponse<IAuditLog>>({
            endpoint: "/admin/audit-logs/paginate",
            method: "GET",
            params: filters,
        })
    },

    getActions: async () => {
        return apiRequest<ApiResponse<string[]>>({
            endpoint: "/admin/audit-logs/actions",
            method: "GET",
        })
    },

    getById: async (id: string) => {
        return apiRequest<ApiResponse<IAuditLog>>({
            endpoint: `/admin/audit-logs/${id}`,
            method: "GET",
        })
    },
}

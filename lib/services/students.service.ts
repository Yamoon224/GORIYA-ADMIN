import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IUser } from "@/lib/@types/entities"
import { UserStatus } from "@/lib/@types/enums"

export const studentsService = {
    getStudents: async (params?: { page?: number; limit?: number; search?: string; status?: UserStatus }) => {
        return apiRequest<IPaginatedResponse<IUser>>({
            endpoint: "/students/paginate",
            method: "GET",
            params,
        })
    },

    getStudentById: async (id: string) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/students/${id}`,
            method: "GET",
        })
    },

    getStudentStats: async () => {
        return apiRequest<ApiResponse<{
            total: number
            active: number
            inactive: number
            newThisMonth: number
        }>>({
            endpoint: "/students/stats",
            method: "GET",
        })
    },

    createStudent: async (data: Partial<IUser> & { password: string }) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: "/students",
            method: "POST",
            data,
        })
    },

    updateStudent: async (id: string, data: Partial<IUser>) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/students/${id}`,
            method: "PATCH",
            data,
        })
    },

    deleteStudent: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/students/${id}`,
            method: "DELETE",
        })
    },

    updateStudentStatus: async (id: string, status: UserStatus) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/students/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },

    exportCSV: async () => {
        return apiRequest<Blob>({
            endpoint: "/students/export",
            method: "GET",
            params: { format: "csv" },
        })
    },
}

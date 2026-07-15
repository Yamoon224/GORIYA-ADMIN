import { apiRequest } from "@/lib/api-client-http"
import { IPaginatedResponse } from "@/lib/@types/api"

export interface ICourse {
    id: string
    title: string
    description: string | null
    category: string | null
    provider: string | null
    durationHours: number | null
    thumbnailPath: string | null
}

export interface ICreateCourseData {
    title: string
    description?: string
    category?: string
    provider?: string
    durationHours?: number
}

export const courseService = {
    paginate: async (filters?: { page?: number; limit?: number; category?: string }) => {
        return apiRequest<IPaginatedResponse<ICourse>>({
            endpoint: "/courses/paginate",
            method: "GET",
            params: filters,
        })
    },

    create: async (data: ICreateCourseData) => {
        return apiRequest<ICourse>({ endpoint: "/courses", method: "POST", data })
    },

    remove: async (id: string) => {
        return apiRequest<{ message: string }>({ endpoint: `/courses/${id}`, method: "DELETE" })
    },
}

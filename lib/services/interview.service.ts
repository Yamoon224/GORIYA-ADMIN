import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { IInterviewSession } from "@/lib/@types/entities"
import { InterviewStatus } from "@/lib/@types/enums"

export const interviewService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            todaySessions: number
            averageScore: number
            averageDuration: string
            satisfaction: number
        }>>({
            endpoint: "/interview-simulation/stats",
            method: "GET",
        })
    },

    getSessions: async (params?: { page?: number; limit?: number; status?: InterviewStatus }) => {
        return apiRequest<IPaginatedResponse<IInterviewSession>>({
            endpoint: "/interview-simulation/sessions",
            method: "GET",
            params,
        })
    },

    getActiveSessions: async () => {
        return apiRequest<ApiResponse<IInterviewSession[]>>({
            endpoint: "/interview-simulation/active",
            method: "GET",
        })
    },

    getSessionHistory: async (params?: { page?: number; limit?: number }) => {
        return apiRequest<IPaginatedResponse<IInterviewSession>>({
            endpoint: "/interview-simulation/history",
            method: "GET",
            params,
        })
    },

    getSessionById: async (id: string) => {
        return apiRequest<ApiResponse<IInterviewSession>>({
            endpoint: `/interview-simulation/sessions/${id}`,
            method: "GET",
        })
    },

    startSession: async (data: { candidateId: string; position: string }) => {
        return apiRequest<ApiResponse<IInterviewSession>>({
            endpoint: "/interview-simulation/start",
            method: "POST",
            data,
        })
    },

    endSession: async (sessionId: string, feedback: string) => {
        return apiRequest<ApiResponse<IInterviewSession>>({
            endpoint: `/interview-simulation/sessions/${sessionId}/end`,
            method: "PATCH",
            data: { feedback },
        })
    },

    deleteSession: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/interview-simulation/sessions/${id}`,
            method: "DELETE",
        })
    },
}

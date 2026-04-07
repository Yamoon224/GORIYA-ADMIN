import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse } from "@/lib/@types/api"

export interface ISystemSettings {
    platformName: string
    mainUrl: string
    supportEmail: string
    timezone: string
    description: string
    maintenanceMode: boolean
    maxUploadSize: number
    allowedFileTypes: string[]
    smtpHost?: string
    smtpPort?: number
    smtpUser?: string
}

export const settingsService = {
    getSettings: async () => {
        return apiRequest<ApiResponse<ISystemSettings>>({
            endpoint: "/settings",
            method: "GET",
        })
    },

    updateSettings: async (data: Partial<ISystemSettings>) => {
        return apiRequest<ApiResponse<ISystemSettings>>({
            endpoint: "/settings",
            method: "PATCH",
            data,
        })
    },

    getEmailSettings: async () => {
        return apiRequest<ApiResponse<{
            smtpHost: string
            smtpPort: number
            smtpUser: string
            senderName: string
            senderEmail: string
        }>>({
            endpoint: "/settings/email",
            method: "GET",
        })
    },

    updateEmailSettings: async (data: {
        smtpHost: string
        smtpPort: number
        smtpUser: string
        smtpPassword?: string
        senderName: string
        senderEmail: string
    }) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: "/settings/email",
            method: "PATCH",
            data,
        })
    },

    testEmailConfig: async () => {
        return apiRequest<ApiResponse<{ success: boolean; message: string }>>({
            endpoint: "/settings/email/test",
            method: "POST",
        })
    },
}

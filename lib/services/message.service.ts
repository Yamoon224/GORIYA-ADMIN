import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse } from "@/lib/@types/api"

export const messageService = {
    getConversations: async () => {
        return apiRequest<ApiResponse<any[]>>({
            endpoint: "/messages/conversations",
            method: "GET",
        })
    },

    getConversationMessages: async (conversationId: string) => {
        return apiRequest<ApiResponse<any[]>>({
            endpoint: `/messages/conversations/${conversationId}/messages`,
            method: "GET",
        })
    },

    sendMessage: async (conversationId: string, content: string) => {
        return apiRequest<ApiResponse<any>>({
            endpoint: `/messages/conversations/${conversationId}/messages`,
            method: "POST",
            data: { content },
        })
    },

    markAsRead: async (conversationId: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/messages/conversations/${conversationId}/read`,
            method: "PUT",
        })
    },

    createConversation: async (participantId: string) => {
        return apiRequest<ApiResponse<any>>({
            endpoint: "/messages/conversations",
            method: "POST",
            data: { participantId },
        })
    },
}

import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse } from "@/lib/@types/api"
import { ICalendarEvent } from "@/lib/@types/entities"
import { EventStatus, EventType } from "@/lib/@types/enums"

export const planningService = {
    getStats: async () => {
        return apiRequest<ApiResponse<{
            totalEvents: number
            upcomingEvents: number
            completedEvents: number
            cancelledEvents: number
        }>>({
            endpoint: "/planning/stats",
            method: "GET",
        })
    },

    getEvents: async (date: string) => {
        return apiRequest<ApiResponse<ICalendarEvent[]>>({
            endpoint: "/planning/events",
            method: "GET",
            params: { date },
        })
    },

    getUpcomingEvents: async (limit = 10) => {
        return apiRequest<ApiResponse<ICalendarEvent[]>>({
            endpoint: "/planning/upcoming",
            method: "GET",
            params: { limit },
        })
    },

    getEventById: async (id: string) => {
        return apiRequest<ApiResponse<ICalendarEvent>>({
            endpoint: `/planning/events/${id}`,
            method: "GET",
        })
    },

    createEvent: async (data: {
        title: string
        type: EventType
        startTime: string
        endTime: string
        participants: string[]
        location?: string
    }) => {
        return apiRequest<ApiResponse<ICalendarEvent>>({
            endpoint: "/planning/events",
            method: "POST",
            data,
        })
    },

    updateEvent: async (id: string, data: Partial<{
        title: string
        type: EventType
        startTime: string
        endTime: string
        participants: string[]
        location: string
        status: EventStatus
    }>) => {
        return apiRequest<ApiResponse<ICalendarEvent>>({
            endpoint: `/planning/events/${id}`,
            method: "PATCH",
            data,
        })
    },

    deleteEvent: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/planning/events/${id}`,
            method: "DELETE",
        })
    },
}

import { apiRequest } from "@/lib/api-client-http"

export interface SubscriptionStats {
    total: number
    active: number
    expired: number
    revenue: number
}

export interface SubscriptionRow {
    id: string
    userId: string
    status: string
    startDate: string
    endDate: string | null
    autoRenew: boolean
    createdAt: string
    user?: {
        id: string
        name: string
        email: string
        role: string
        status: string
    }
    plan?: {
        id: string
        name: string
        price: number
        billingPeriod: string
        userType: string
    }
}

export const subscriptionService = {
    getAdminStats: (token?: string) =>
        apiRequest<SubscriptionStats>({ endpoint: "/subscriptions/admin/stats", method: "GET", token }),

    getAllSubscriptions: (page = 1, limit = 10, token?: string) =>
        apiRequest<{ data: SubscriptionRow[]; total: number; page: number; limit: number }>({
            endpoint: `/subscriptions/admin/all?page=${page}&limit=${limit}`,
            method: "GET",
            token,
        }),

    getRevenueTrend: (token?: string) =>
        apiRequest<{ data: Array<{ month: string; value: number }> }>({
            endpoint: "/subscriptions/admin/revenue-trend",
            method: "GET",
            token,
        }),

    getSubscriptionsTrend: (token?: string) =>
        apiRequest<{ data: Array<{ month: string; value: number }> }>({
            endpoint: "/subscriptions/admin/subscriptions-trend",
            method: "GET",
            token,
        }),
}

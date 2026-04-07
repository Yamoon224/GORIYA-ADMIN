import { ApiResponse, IPaginatedResponse } from "@/lib/@types/api"
import { apiRequest } from "@/lib/api-client-http"
import { IUser } from "@/lib/@types/entities"
import { UserRole, UserStatus } from "@/lib/@types/enums"

export const userService = {
    getProfile: async () => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: "/auth/profile",
            method: "GET",
        })
    },

    updateProfile: async (profileData: Partial<IUser>) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: "/user/profile",
            method: "PUT",
            data: profileData,
        })
    },

    uploadAvatar: async (file: File) => {
        const formData = new FormData()
        formData.append("avatar", file)
        return apiRequest<ApiResponse<{ avatarUrl: string }>>({
            endpoint: "/user/avatar",
            method: "POST",
            data: formData,
        })
    },

    // Admin methods
    getUsers: async (params?: { page?: number; limit?: number; role?: UserRole; status?: UserStatus; search?: string }) => {
        return apiRequest<IPaginatedResponse<IUser>>({
            endpoint: "/users/paginate",
            method: "GET",
            params,
        })
    },

    getUserById: async (id: string) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/users/${id}`,
            method: "GET",
        })
    },

    getUserStats: async () => {
        return apiRequest<ApiResponse<{
            totalUsers: number
            enterprises: number
            activeUsers: number
            newUsers: number
        }>>({
            endpoint: "/users/stats",
            method: "GET",
        })
    },

    createUser: async (data: Partial<IUser> & { password: string }) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: "/users",
            method: "POST",
            data,
        })
    },

    updateUser: async (id: string, data: Partial<IUser>) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/users/${id}`,
            method: "PATCH",
            data,
        })
    },

    updateUserStatus: async (id: string, status: UserStatus) => {
        return apiRequest<ApiResponse<IUser>>({
            endpoint: `/users/${id}/status`,
            method: "PATCH",
            data: { status },
        })
    },

    deleteUser: async (id: string) => {
        return apiRequest<ApiResponse<null>>({
            endpoint: `/users/${id}`,
            method: "DELETE",
        })
    },
}

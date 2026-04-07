import { apiRequest } from "@/lib/api-client-http"
import { ApiResponse } from "@/lib/@types/api"
import { IUser } from "@/lib/@types/entities";

export const authService = {
    login: async (credentials: { email: string; password: string }) => {
        return apiRequest<{ access_token: string; user: IUser }>({
            endpoint: "/auth/login",
            method: "POST",
            data: credentials,
        })
    },

    signup: async (userData: {
        name: string
        email: string
        password: string,
        role: string,
        acceptTerms?: boolean
    }) => {
        return apiRequest<ApiResponse<{ token: string; user: IUser }>>({
            endpoint: "/users",
            method: "POST",
            data: userData,
        })
    },

    logout: async () => {
        return apiRequest<ApiResponse<null>>({
            endpoint: "/auth/logout",
            method: "POST",
        })
    },

    refreshToken: async () => {
        return apiRequest<ApiResponse<{ token: string }>>(  {
            endpoint: "/auth/refresh",
            method: "POST",
        })
    },

    verifyOtp: async (email: string, code: string) => {
        return apiRequest<ApiResponse<{ token: string; user: IUser }>>({  
            endpoint: "/auth/verify-otp",
            method: "POST",
            data: { email, code },
        })
    },

    googleAuth: async (googleData: {
        googleId: string
        email: string
        name: string
        firstName: string
        lastName: string
        picture: string
    }) => {
        return apiRequest<ApiResponse<{ token: string; user: IUser }>>({  
            endpoint: "/auth/google",
            method: "POST",
            data: googleData,
        })
    },
}

import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.goriya.com"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("goriya_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Types
export interface LoginCredentials {
    email: string
    password: string
}

export interface DashboardStats {
    activeStudents: number
    partnerCompanies: number
    analyzedCVs: number
    jobOffers: number
}

export interface Student {
    id: string
    name: string
    email: string
    field: string
    matchingScore: number
    status: "active" | "premium" | "inactive"
    joinDate: string
    avatar: string
}

export interface AnalyticsData {
    analyzedCVs: number
    successfulInterviews: number
    matchingRate: number
    averageAnalysisTime: string
    evolutionData: Array<{ month: string; value: number }>
    activityDistribution: Array<{ name: string; value: number; color: string }>
}

export interface CVAnalysis {
    id: string
    fileName: string
    analysisScore: number
    recommendations: string[]
    uploadDate: string
    status: "analyzing" | "completed" | "failed"
}

export interface Candidature {
    id: string
    candidateName: string
    candidateEmail: string
    position: string
    company: string
    status: "en_attente" | "en_cours" | "approuvee" | "rejetee"
    score: number
    appliedDate: string
    avatar: string
}

export interface Company {
    id: string
    name: string
    sector: string
    activeOffers: number
    placedCandidates: number
    partnershipDate: string
    logo: string
    status: "active" | "inactive"
}

export interface MatchingResult {
    id: string
    candidateName: string
    candidateEmail: string
    position: string
    company: string
    matchingScore: number
    status: "nouveau" | "en_cours" | "finalise"
    matchDate: string
    avatar: string
}

export interface JobOffer {
    id: string
    title: string
    company: string
    location: string
    type: "CDI" | "CDD" | "Stage" | "Freelance"
    salary: string
    description: string
    requirements: string[]
    postedDate: string
    status: "active" | "closed" | "draft"
    applicants: number
}

export interface SystemSettings {
    platformName: string
    mainUrl: string
    supportEmail: string
    timezone: string
    description: string
}

export interface CalendarEvent {
    id: string
    title: string
    type: "entretien" | "formation" | "reunion"
    startTime: string
    endTime: string
    participants: string[]
    location?: string
    status: "confirmed" | "pending" | "cancelled"
}

export interface Portfolio {
    id: string
    candidateName: string
    candidateEmail: string
    title: string
    description: string
    skills: string[]
    projects: Array<{
        name: string
        description: string
        technologies: string[]
        imageUrl?: string
    }>
    views: number
    downloads: number
    likes: number
    createdDate: string
    avatar: string
}

// New types for the final 4 pages
export interface SearchResult {
    id: string
    name: string
    email: string
    type: "candidate" | "offer"
    position?: string
    company?: string
    location: string
    experience: string
    skills: string[]
    matchingScore: number
    avatar: string
    status: "available" | "busy" | "offline"
}

export interface SearchFilters {
    type: "candidate" | "offer" | "all"
    location?: string
    experience?: string
    minScore?: number
    sector?: string
}

export interface InterviewSession {
    id: string
    candidateName: string
    candidateEmail: string
    position: string
    duration: number
    score: number
    status: "active" | "completed" | "scheduled"
    startTime: string
    feedback?: string
    avatar: string
}

export interface InterviewStats {
    todaySessions: number
    averageScore: number
    averageDuration: string
    satisfaction: number
}

export interface User {
    id: string
    name: string
    email: string
    role: "admin" | "user" | "enterprise"
    status: "active" | "inactive"
    registrationDate: string
    lastLogin?: string
    references: string
    avatar: string
}

export interface UserStats {
    totalUsers: number
    enterprises: number
    activeUsers: number
    newUsers: number
}

export interface ScoringCriteria {
    name: string
    weight: number
    score: number
    maxScore: number
}

export interface ScoringResult {
    id: string
    candidateName: string
    candidateEmail: string
    position: string
    overallScore: number
    criteria: ScoringCriteria[]
    analysisDate: string
    avatar: string
    status: "completed" | "in_progress"
}

export interface ScoringStats {
    generatedScores: number
    averageScore: number
    accuracy: number
    averageTime: string
}

// API Functions
export const authAPI = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post("/auth/login", credentials)
        return response.data
    },

    logout: async () => {
        const response = await api.post("/auth/logout")
        localStorage.removeItem("goriya_token")
        return response.data
    },
}

export const dashboardAPI = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await api.get("/dashboard/stats")
        return response.data
    },

    getPerformanceData: async () => {
        const response = await api.get("/dashboard/performance")
        return response.data
    },
}

export const studentsAPI = {
    getStudents: async (page = 1, limit = 10) => {
        const response = await api.get(`/students?page=${page}&limit=${limit}`)
        return response.data
    },

    getStudentStats: async () => {
        const response = await api.get("/students/stats")
        return response.data
    },

    exportCSV: async () => {
        const response = await api.get("/students/export", { responseType: "blob" })
        return response.data
    },
}

export const analyticsAPI = {
    getAnalytics: async (): Promise<AnalyticsData> => {
        const response = await api.get("/analytics")
        return response.data
    },

    getEvolutionData: async (period: string) => {
        const response = await api.get(`/analytics/evolution?period=${period}`)
        return response.data
    },
}

export const cvAnalysisAPI = {
    getStats: async () => {
        const response = await api.get("/cv-analysis/stats")
        return response.data
    },

    analyzeCV: async (file: File) => {
        const formData = new FormData()
        formData.append("cv", file)
        const response = await api.post("/cv-analysis/analyze", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response.data
    },

    getRecentAnalyses: async () => {
        const response = await api.get("/cv-analysis/recent")
        return response.data
    },

    getRecommendations: async () => {
        const response = await api.get("/cv-analysis/recommendations")
        return response.data
    },
}

export const candidaturesAPI = {
    getStats: async () => {
        const response = await api.get("/candidatures/stats")
        return response.data
    },

    getCandidatures: async (page = 1, limit = 10, status?: string) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
        if (status) params.append("status", status)
        const response = await api.get(`/candidatures?${params}`)
        return response.data
    },

    updateCandidatureStatus: async (id: string, status: string) => {
        const response = await api.patch(`/candidatures/${id}/status`, { status })
        return response.data
    },
}

export const companiesAPI = {
    getStats: async () => {
        const response = await api.get("/companies/stats")
        return response.data
    },

    getCompanies: async (page = 1, limit = 10) => {
        const response = await api.get(`/companies?page=${page}&limit=${limit}`)
        return response.data
    },

    getSectorDistribution: async () => {
        const response = await api.get("/companies/sectors")
        return response.data
    },

    addCompany: async (companyData: Partial<Company>) => {
        const response = await api.post("/companies", companyData)
        return response.data
    },
}

export const matchingAPI = {
    getStats: async () => {
        const response = await api.get("/matching/stats")
        return response.data
    },

    getAlgorithmPerformance: async () => {
        const response = await api.get("/matching/algorithms")
        return response.data
    },

    getRecentMatches: async () => {
        const response = await api.get("/matching/recent")
        return response.data
    },

    getActivityFeed: async () => {
        const response = await api.get("/matching/activity")
        return response.data
    },
}

export const jobOffersAPI = {
    getStats: async () => {
        const response = await api.get("/job-offers/stats")
        return response.data
    },

    getJobOffers: async (page = 1, limit = 10, status?: string) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
        if (status) params.append("status", status)
        const response = await api.get(`/job-offers?${params}`)
        return response.data
    },

    getSectorDistribution: async () => {
        const response = await api.get("/job-offers/sectors")
        return response.data
    },

    createJobOffer: async (jobData: Partial<JobOffer>) => {
        const response = await api.post("/job-offers", jobData)
        return response.data
    },

    updateJobOffer: async (id: string, jobData: Partial<JobOffer>) => {
        const response = await api.patch(`/job-offers/${id}`, jobData)
        return response.data
    },
}

export const settingsAPI = {
    getSettings: async (): Promise<SystemSettings> => {
        const response = await api.get("/settings")
        return response.data
    },

    updateSettings: async (settings: Partial<SystemSettings>) => {
        const response = await api.patch("/settings", settings)
        return response.data
    },
}

export const planificationAPI = {
    getStats: async () => {
        const response = await api.get("/planning/stats")
        return response.data
    },

    getEvents: async (date: string) => {
        const response = await api.get(`/planning/events?date=${date}`)
        return response.data
    },

    getUpcomingEvents: async () => {
        const response = await api.get("/planning/upcoming")
        return response.data
    },

    createEvent: async (eventData: Partial<CalendarEvent>) => {
        const response = await api.post("/planning/events", eventData)
        return response.data
    },

    updateEvent: async (id: string, eventData: Partial<CalendarEvent>) => {
        const response = await api.patch(`/planning/events/${id}`, eventData)
        return response.data
    },
}

export const portfoliosAPI = {
    getStats: async () => {
        const response = await api.get("/portfolios/stats")
        return response.data
    },

    getPortfolios: async (page = 1, limit = 12, category?: string) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
        if (category) params.append("category", category)
        const response = await api.get(`/portfolios?${params}`)
        return response.data
    },

    getFeaturedPortfolios: async () => {
        const response = await api.get("/portfolios/featured")
        return response.data
    },

    getPopularCategories: async () => {
        const response = await api.get("/portfolios/categories")
        return response.data
    },

    likePortfolio: async (id: string) => {
        const response = await api.post(`/portfolios/${id}/like`)
        return response.data
    },
}

// New API functions for the final 4 pages
export const searchAPI = {
    search: async (query: string, filters?: SearchFilters) => {
        const params = new URLSearchParams({ q: query })
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value.toString())
            })
        }
        const response = await api.get(`/search?${params}`)
        return response.data
    },

    getAdvancedFilters: async () => {
        const response = await api.get("/search/filters")
        return response.data
    },

    exportResults: async (query: string, filters?: SearchFilters) => {
        const params = new URLSearchParams({ q: query })
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value.toString())
            })
        }
        const response = await api.get(`/search/export?${params}`, { responseType: "blob" })
        return response.data
    },
}

export const interviewSimulationAPI = {
    getStats: async (): Promise<InterviewStats> => {
        const response = await api.get("/interview-simulation/stats")
        return response.data
    },

    getSessions: async (status?: string) => {
        const params = status ? `?status=${status}` : ""
        const response = await api.get(`/interview-simulation/sessions${params}`)
        return response.data
    },

    getActiveSessions: async () => {
        const response = await api.get("/interview-simulation/active")
        return response.data
    },

    getSessionHistory: async () => {
        const response = await api.get("/interview-simulation/history")
        return response.data
    },

    startSession: async (candidateId: string, position: string) => {
        const response = await api.post("/interview-simulation/start", {
            candidateId,
            position,
        })
        return response.data
    },

    endSession: async (sessionId: string, feedback: string) => {
        const response = await api.patch(`/interview-simulation/sessions/${sessionId}/end`, {
            feedback,
        })
        return response.data
    },
}

export const usersAPI = {
    getStats: async (): Promise<UserStats> => {
        const response = await api.get("/users/stats")
        return response.data
    },

    getUsers: async (page = 1, limit = 10, role?: string) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
        if (role) params.append("role", role)
        const response = await api.get(`/users?${params}`)
        return response.data
    },

    createUser: async (userData: Partial<User>) => {
        const response = await api.post("/users", userData)
        return response.data
    },

    updateUser: async (id: string, userData: Partial<User>) => {
        const response = await api.patch(`/users/${id}`, userData)
        return response.data
    },

    deleteUser: async (id: string) => {
        const response = await api.delete(`/users/${id}`)
        return response.data
    },

    updateUserStatus: async (id: string, status: "active" | "inactive") => {
        const response = await api.patch(`/users/${id}/status`, { status })
        return response.data
    },
}

export const scoringAPI = {
    getStats: async (): Promise<ScoringStats> => {
        const response = await api.get("/scoring/stats")
        return response.data
    },

    getScoringCriteria: async () => {
        const response = await api.get("/scoring/criteria")
        return response.data
    },

    getAlgorithmPerformance: async () => {
        const response = await api.get("/scoring/performance")
        return response.data
    },

    getRecentAnalyses: async () => {
        const response = await api.get("/scoring/recent")
        return response.data
    },

    scoreCandidate: async (candidateId: string, position: string) => {
        const response = await api.post("/scoring/analyze", {
            candidateId,
            position,
        })
        return response.data
    },

    updateCriteria: async (criteria: ScoringCriteria[]) => {
        const response = await api.patch("/scoring/criteria", { criteria })
        return response.data
    },
}

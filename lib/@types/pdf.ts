export interface CVData {
    personalInfo: {
        firstName: string
        lastName: string
        email: string
        phone: string
        address: string
        title: string
        summary: string
    }
    experience: Array<{
        company: string
        position: string
        startDate: string
        endDate: string
        description: string
    }>
    education: Array<{
        institution: string
        degree: string
        startDate: string
        endDate: string
    }>
    skills: string[]
    languages: Array<{
        language: string
        level: string
    }>
}
import { twMerge } from 'tailwind-merge'
import { IUser } from '@/lib/@types/entities'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Lit le profil utilisateur stocké côté client (localStorage `goriya_user`).
 * Le token, lui, vit uniquement dans un cookie httpOnly : il n'est jamais lisible en JS.
 */
export const getAuth = (): { user: IUser } | null => {
    if (typeof window === 'undefined') return null

    const storedUser = localStorage.getItem('goriya_user')
    if (!storedUser) return null

    try {
        return { user: JSON.parse(storedUser) as IUser }
    } catch {
        return null
    }
}

/** Résout le token JWT côté serveur uniquement (cookie httpOnly `goriya_token`, illisible côté client). */
export async function resolveToken(): Promise<string | undefined> {
    if (typeof window !== 'undefined') {
        return undefined;
    }

    try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return cookieStore.get('goriya_token')?.value ?? undefined;
    } catch {
        return undefined;
    }
}

export function formatDate(
    value: string | Date,
    type: 'date' | 'datetime' | 'time' = 'date',
    locale: string = 'fr-FR'
): string {
    if (!value) return ''

    const date = new Date(value)

    if (isNaN(date.getTime())) {
        return ''
    }

    const optionsMap: Record<typeof type, Intl.DateTimeFormatOptions> = {
        date: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        },
        datetime: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
        },
    }

    return new Intl.DateTimeFormat(locale, optionsMap[type]).format(date)
}


export function formatFileUrl(file: string | null | undefined): string {
    if (!file) return ''
    if (file.startsWith('http://') || file.startsWith('https://')) return file
    return `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://goriya-backend-production.up.railway.app'}/${file}`
}

export function formatAmount(
    value: number | string,
    currency: string = 'XOF',   // Devise par défaut
    locale: string = 'fr-FR',  // Localisation par défaut
    minimumFractionDigits: number = 0,
    maximumFractionDigits: number = 0
): string {
    if (value === null || value === undefined || value === '') return ''

    const amount = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(amount)) return ''

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits
    }).format(amount)
}
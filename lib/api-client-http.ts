import { resolveToken } from './utils';
import { RequestOptions } from '@/lib/@types/api';
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://goriya-backend-production.up.railway.app';

export async function apiRequest<T>({ endpoint, method = 'GET', data, params, token, responseType }: RequestOptions): Promise<T> {
    // Côté navigateur, le token vit dans un cookie httpOnly illisible en JS : on passe par notre
    // propre route /api/proxy qui lit le cookie côté serveur et l'attache à l'appel backend.
    // Côté serveur (SSR/RSC), on peut appeler directement le backend avec le token résolu.
    const isBrowser = typeof window !== 'undefined';

    try {
        const config: AxiosRequestConfig = {
            url: isBrowser ? `/api/proxy${endpoint}` : `${API_BASE_URL}${endpoint}`,
            method,
            headers: {},
            data,
            params,
            responseType,
        };

        if (!isBrowser) {
            const resolvedToken = token ?? await resolveToken();
            if (resolvedToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${resolvedToken}`,
                };
            }
        }

        const response = await axios(config);
        return response.data as T;
    } catch (error: any) {
        console.error(`[API ${method}] error on ${endpoint}:`, error.response?.data || error.message);
        throw error.response?.data || error;
    }
}
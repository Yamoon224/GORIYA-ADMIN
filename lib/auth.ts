import { JWT } from "next-auth/jwt"
import { apiRequest } from "./api-client-http";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultUser, DefaultSession, User, Session } from "next-auth";

// 🔹 Étendre les types NextAuth
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            companyId: string;
            access_token: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string
        name: string
        email: string
        role: string
        companyId: string
        access_token: string
    }
}

// 🔹 NextAuth options (tu peux aussi les mettre dans un fichier séparé `auth.ts`)
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const data = await apiRequest<{ access_token: string; user: any }>({
                    endpoint: "/auth/login",
                    method: "POST",
                    data: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                });

                if (!data?.access_token || !data?.user) return null;

                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    companyId: data.user.company.id,
                    access_token: data.access_token,
                };
            },
        }),
    ],
    session: { strategy: "jwt" as const },
    secret: process.env.NEXT_AUTH_SECRET,
    // ✅ ICI tu ajoutes les callbacks
    callbacks: {
        async jwt({
            token,
            user,
        }: {
            token: JWT
            user?: User & { access_token?: string; role?: string }
        }) {
            if (user) {
                token.access_token = user.access_token
                token.role = user.role
                token.id = user.id
                token.companyId = user.companyId
            }
            return token
        },

        async session({
            session,
            token,
        }: {
            session: Session
            token: JWT
        }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.access_token = token.access_token as string
                session.user.companyId = token.companyId as string // 🔹 Ajouté
            }
            return session
        },
    }
};
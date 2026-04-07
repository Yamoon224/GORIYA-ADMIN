import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Goriya - Plateforme | Back Office Admin",
    description: "Plateforme de gestion étudiants et entreprises avec IA",
    // generator: 'v0.app'
    icons: {
        icon: [
            {
                url: '/favicon.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/favicon.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/favicon.png',
                type: 'image/png',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={`${inter.className} h-screen overflow-hidden`}>
                {children}
            </body>
        </html>
    )
}
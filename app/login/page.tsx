"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { authService } from "@/lib/services/auth.service"
import { Mail, Phone, Globe, Eye, EyeOff } from "lucide-react"
import { AppLogo } from "@/components/app-logo"
import { toast } from "sonner"

export default function Page() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await authService.login(credentials)

            localStorage.setItem("goriya_token", response.access_token)
            localStorage.setItem("goriya_user", JSON.stringify(response.user))

            toast.success("Connexion réussie")
            router.push("/dashboard")
        } catch (error) {
            console.error("Login error:", error)
            toast.error("Email ou mot de passe incorrect")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/bg-auth.webp)" }}>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
                {/* Left side - Bienvenue (hidden on mobile) */}
                <div className="hidden md:flex flex-1 items-end px-14 pb-40">
                    <div className="w-full">
                        <h1 className="text-5xl font-light text-white pb-3">Bienvenue</h1>
                        <div className="border-b-4 border-white/60 w-full"></div>
                    </div>
                </div>

                {/* Right side - Card + Contact */}
                <div className="w-full md:w-[500px] flex flex-col justify-center px-4 py-8 md:px-10 md:py-10 min-h-screen md:min-h-0">
                    {/* Mobile: Bienvenue header */}
                    <div className="md:hidden text-center mb-6">
                        <h1 className="text-3xl font-light text-white">Bienvenue</h1>
                    </div>

                    {/* Login Card */}
                    <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                        <CardContent className="p-6 md:p-10">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-2">
                                    <AppLogo />
                                </div>
                                <p className="text-gray-500 text-sm mt-1">Portail Goriya Admin</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-500">Adresse administrateur</label>
                                    <Input
                                        type="email"
                                        value={credentials.email}
                                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                        required
                                        className="h-10"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-500">Mot de passe</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={credentials.password}
                                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                            required
                                            className="h-11 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="w-2/4 rounded-full h-10 bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 text-white font-medium mt-2"
                                        disabled={loading}
                                    >
                                        {loading ? "Connexion..." : "Connexion"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="mt-2 bg-black/50 backdrop-blur-sm rounded-sm p-4 text-white text-sm">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span>Courriel: rh@goriya.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 shrink-0" />
                                <span>Téléphone: +33 (0)1 23 45 67 89</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 shrink-0" />
                                <span>Site internet: www.goriya.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

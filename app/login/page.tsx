"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/lib/services/auth.service"
import { Mail, Phone, Globe } from "lucide-react"
import { AppLogo } from "@/components/app-logo"
import { toast } from "sonner"

export default function Page() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
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
        <div className="relative h-screen overflow-x-hidden overflow-y-auto">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/bg-auth.png)" }} />
            <div className="absolute inset-0 bg-[#1f4ea6]/35" />

            <div className="relative z-10 min-h-full px-4 py-8 md:px-0 md:py-0">
                <div className="mx-auto flex min-h-full w-full max-w-[1365px] items-center justify-between">
                    <div className="hidden md:flex min-h-screen w-full items-end pb-[170px] pl-[110px]">
                        <div className="w-[780px]">
                            <h1 className="text-[58px] leading-none font-light text-white">Bienvenue</h1>
                        </div>
                    </div>

                    <div className="relative w-full md:mr-[95px] md:w-auto md:pt-[95px]">
                        <div className="mx-auto w-full rounded-[28px] bg-white/95 p-7 shadow-2xl backdrop-blur-[1px] md:mx-0 md:w-[495px] md:p-8">
                            <div className="mb-10 text-center">
                                <div className="mb-2 flex items-center justify-center">
                                    <AppLogo width={172} />
                                </div>
                                <p className="text-[28px] text-gray-600 md:text-[36px]">Portail Goriya Admin</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[17px] text-[#5c5f66]">Adresse administrateur</label>
                                    <Input
                                        type="email"
                                        value={credentials.email}
                                        placeholder=""
                                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                        required
                                        className="h-[52px] rounded-xl border-0 bg-[#eef0f4] px-4 text-[16px] shadow-none focus-visible:ring-2 focus-visible:ring-blue-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[17px] text-[#5c5f66]">Mot de passe</label>
                                    <Input
                                        type="password"
                                        value={credentials.password}
                                        placeholder=""
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        required
                                        className="h-[52px] rounded-xl border-0 bg-[#eef0f4] px-4 text-[16px] shadow-none focus-visible:ring-2 focus-visible:ring-blue-300"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        className="h-[51px] w-full rounded-full bg-gradient-to-r from-[#2680ff] to-[#0037bd] text-[25px] font-semibold text-white hover:from-[#2d87ff] hover:to-[#0034ad] md:w-[215px] md:ml-auto"
                                        disabled={loading}
                                    >
                                        {loading ? "Connexion..." : "Connexion"}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="mx-auto mt-4 w-full rounded-[0_0_26px_26px] bg-black/45 px-8 py-5 text-white backdrop-blur-sm md:absolute md:left-0 md:top-[468px] md:mt-0 md:w-[495px]">
                            <div className="space-y-3 text-[15px] leading-tight font-light">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                                    <div>
                                        <p>Courriel:</p>
                                        <p>joigne@email.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                                    <div>
                                        <p>Téléphone</p>
                                        <p>Téléphone: +44 1245 572 135</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Globe className="mt-0.5 h-5 w-5 shrink-0" />
                                    <div>
                                        <p>Site internet</p>
                                        <p>www.jakegyll.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute left-0 right-0 top-[468px] hidden border-t-4 border-white/60 md:block" />
            </div>
        </div>
    )
}

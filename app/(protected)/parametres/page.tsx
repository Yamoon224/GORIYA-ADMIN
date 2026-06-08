"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Database, Mail, Palette, Settings, Shield, User, Save } from "lucide-react"

const tabs = [
    { key: "general", label: "Général", icon: Settings, active: true },
    { key: "profile", label: "Profil", icon: User, active: false },
    { key: "notifications", label: "Notifications", icon: Bell, active: false },
    { key: "appearance", label: "Apparence", icon: Palette, active: false },
    { key: "emails", label: "Emails", icon: Mail, active: false },
    { key: "database", label: "Base de Données", icon: Database, active: false },
    { key: "security", label: "Sécurité", icon: Shield, active: false },
]

export default function Page() {
    const [platformName, setPlatformName] = useState("Goriya")
    const [mainUrl, setMainUrl] = useState("https://goriya.com")
    const [supportEmail, setSupportEmail] = useState("support@goriya.com")
    const [timezone, setTimezone] = useState("Europe/Paris")
    const [description, setDescription] = useState(
        "Plateforme d'emploi intelligente utilisant l'IA pour optimiser le matching candidats-entreprises et l'analyse de CV.",
    )

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Paramètres Système</h1>
                <p className="mt-1 text-[14px] text-[#7f8797]">Configuration générale de la plateforme Goriya</p>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-3 py-2">
                    <div className="grid grid-cols-2 gap-1 md:grid-cols-4 xl:grid-cols-7">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                className={`flex h-9 items-center justify-center gap-2 rounded-lg px-2 text-[12px] ${
                                    tab.active
                                        ? "bg-[#f4f6fb] text-[#2f3647]"
                                        : "text-[#7f8797] hover:bg-[#f8f9fc]"
                                }`}
                            >
                                <tab.icon className="h-3.5 w-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[31px] font-semibold text-[#242a38]">Configuration Générale</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[12px] text-[#4a5162]">Nom de la plateforme</label>
                            <Input
                                value={platformName}
                                onChange={(event) => setPlatformName(event.target.value)}
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] text-[12px] text-[#313847] shadow-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] text-[#4a5162]">URL principale</label>
                            <Input
                                value={mainUrl}
                                onChange={(event) => setMainUrl(event.target.value)}
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] text-[12px] text-[#313847] shadow-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] text-[#4a5162]">Email support</label>
                            <Input
                                value={supportEmail}
                                onChange={(event) => setSupportEmail(event.target.value)}
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] text-[12px] text-[#313847] shadow-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[12px] text-[#4a5162]">Fuseau horaire</label>
                            <Select value={timezone} onValueChange={setTimezone}>
                                <SelectTrigger className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] text-[12px] text-[#313847] shadow-none">
                                    <SelectValue placeholder="Choisir un fuseau" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                                    <SelectItem value="Africa/Abidjan">Africa/Abidjan</SelectItem>
                                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="mb-2 block text-[12px] text-[#4a5162]">Description de la plateforme</label>
                        <Textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="min-h-28 rounded-lg border-[#edf0f5] bg-[#f8f9fc] text-[12px] text-[#313847] shadow-none"
                        />
                    </div>

                    <Button className="mt-4 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                        <Save className="h-3.5 w-3.5" />
                        Enregistrer les Modifications
                    </Button>
                </CardContent>
            </Card>

            <Badge className="hidden">placeholder</Badge>
        </div>
    )
}

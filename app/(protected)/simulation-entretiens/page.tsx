"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Calendar,
    MessageSquare,
    Trophy,
    Clock3,
    Star,
    Brain,
    TrendingUp,
    Users,
    Mic,
    Eye,
} from "lucide-react"

const stats = [
    { label: "Sessions Aujourd'hui", value: "47", icon: MessageSquare },
    { label: "Score Moyen", value: "84.2", icon: Trophy },
    { label: "Durée Moyenne", value: "32min", icon: Clock3 },
    { label: "Satisfaction", value: "4.7/5", icon: Star },
]

const performanceRows = [
    { label: "Réussite Entretiens", value: 78 },
    { label: "Satisfaction Candidats", value: 92 },
    { label: "Taux de Complétion", value: 85 },
]

const activeSessions = [
    {
        initials: "SL",
        name: "Sophie Laurent",
        subtitle: "Data Science • 8/15 questions",
        status: "En cours",
        statusClass: "bg-[#edf0f6] text-[#3d4354]",
    },
    {
        initials: "JM",
        name: "Jules Moreau",
        subtitle: "UX Design • Mode Premium",
        status: "Programmé",
        statusClass: "bg-[#2f80ed] text-white",
    },
]

const historyRows = [
    {
        initials: "MD",
        name: "Marie Dubois",
        role: "Développement Web",
        mode: "IA Chatbot",
        details: "12 questions",
        score: "87/100",
        duration: "25 min",
        status: "Terminé",
        statusClass: "bg-[#2f80ed] text-white",
    },
    {
        initials: "PM",
        name: "Pierre Martin",
        role: "Marketing Digital",
        mode: "RH Premium",
        details: "18 questions",
        score: "92/100",
        duration: "45 min",
        status: "Terminé",
        statusClass: "bg-[#2f80ed] text-white",
    },
    {
        initials: "SL",
        name: "Sophie Laurent",
        role: "Data Science",
        mode: "IA Chatbot",
        details: "8 questions",
        score: "",
        duration: "",
        status: "En cours",
        statusClass: "bg-[#edf0f6] text-[#3d4354]",
    },
]

export default function Page() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Simulation d'Entretiens</h1>
                <p className="mt-1 text-[14px] text-[#7f8797]">
                    Gestion et analyse des entretiens IA et sessions avec professionnels RH
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="flex items-start justify-between px-4 py-4">
                            <div>
                                <p className="text-[11px] text-[#8b92a3]">{stat.label}</p>
                                <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{stat.value}</p>
                            </div>
                            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a89ef]">
                                <stat.icon className="h-4 w-4 text-white" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <Brain className="h-4 w-4" />
                            Configuration IA
                        </h2>

                        <div className="space-y-5 text-[12px]">
                            <div>
                                <p className="font-medium text-[#2d3443]">Chatbot IA Avancé</p>
                                <p className="mt-1 text-[#8a92a3]">Questions adaptatives basées sur le profil</p>
                                <div className="mt-2 flex justify-between text-[#4a5162]">
                                    <span>Précision: 94%</span>
                                    <span>Sessions: 1,247</span>
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-[#2d3443]">Mode Premium RH</p>
                                <p className="mt-1 text-[#8a92a3]">Entretiens avec professionnels</p>
                                <div className="mt-2 flex justify-between text-[#4a5162]">
                                    <span>Disponible: 8 RH</span>
                                    <span>Sessions: 156</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="mt-5 h-9 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]"
                        >
                            <Mic className="h-3.5 w-3.5" />
                            Configurer Scénarios
                        </Button>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <TrendingUp className="h-4 w-4" />
                            Performances
                        </h2>

                        <div className="space-y-4">
                            {performanceRows.map((row) => (
                                <div key={row.label} className="space-y-1">
                                    <div className="flex items-center justify-between text-[12px]">
                                        <span className="text-[#3f4657]">{row.label}</span>
                                        <span className="text-[#4a5162]">{row.value}%</span>
                                    </div>
                                    <Progress
                                        value={row.value}
                                        className="h-2 bg-[#ebeff8] [&_[data-slot=progress-indicator]]:bg-[#3f7fe8]"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 border-t border-[#eceff6] pt-3">
                            <p className="text-[11px] text-[#8a92a3]">Domaines populaires:</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {[
                                    "Développement",
                                    "Marketing",
                                    "Design",
                                ].map((label) => (
                                    <Badge
                                        key={label}
                                        className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]"
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <Users className="h-4 w-4" />
                            Sessions Actives
                        </h2>

                        <div className="space-y-3">
                            {activeSessions.map((session) => (
                                <div key={session.name} className="rounded-lg border border-[#e7ebf3] bg-[#f8f9fc] px-3 py-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[11px] font-semibold text-white">
                                                {session.initials}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#252c3b]">{session.name}</p>
                                                <p className="text-[11px] text-[#7f8797]">{session.subtitle}</p>
                                            </div>
                                        </div>
                                        <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${session.statusClass}`}>
                                            {session.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            className="mt-4 h-9 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]"
                        >
                            <Calendar className="h-3.5 w-3.5" />
                            Voir Planning
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[28px] font-semibold text-[#242a38]">Historique des Sessions</h2>

                    <div className="space-y-3">
                        {historyRows.map((row) => (
                            <div
                                key={`${row.name}-${row.mode}`}
                                className="flex flex-col gap-3 rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3 lg:flex-row lg:items-center lg:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[11px] font-semibold text-white">
                                        {row.initials}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-medium text-[#252c3b]">{row.name}</p>
                                        <p className="text-[11px] text-[#7f8797]">{row.role}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                                    <div className="text-right">
                                        <p className="text-[12px] text-[#4a5162]">{row.mode}</p>
                                        <p className="text-[10px] text-[#8a92a3]">{row.details}</p>
                                    </div>
                                    {row.score ? (
                                        <div className="text-right">
                                            <p className="text-[25px] font-semibold text-[#232a38]">{row.score}</p>
                                            <p className="text-[10px] text-[#8a92a3]">{row.duration}</p>
                                        </div>
                                    ) : null}
                                    <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${row.statusClass}`}>
                                        {row.status}
                                    </Badge>
                                    <Button
                                        variant="outline"
                                        className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        Voir Détails
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

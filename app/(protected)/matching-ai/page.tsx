"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Brain,
    TrendingUp,
    Target,
    Heart,
    Zap,
    Users,
    Activity,
    Eye,
} from "lucide-react"

const stats = [
    { title: "Matchings Aujourd'hui", value: "127", icon: Users },
    { title: "Score Moyen", value: "86.7%", icon: Brain },
    { title: "Taux de Réussite", value: "73.4%", icon: TrendingUp },
    { title: "Matches Parfaits", value: "45", icon: Heart },
]

const criteria = [
    { label: "Compétences techniques", weight: 35 },
    { label: "Expérience", weight: 30 },
    { label: "Culture d'entreprise", weight: 20 },
    { label: "Localisation", weight: 15 },
]

const perfBars = [
    { label: "Précision", value: 91.2 },
    { label: "Vitesse", value: 94.8 },
]

const sectors = [
    { label: "Développement", matches: 342, score: 89.2 },
    { label: "Design", matches: 156, score: 85.7 },
    { label: "Marketing", matches: 98, score: 82.4 },
    { label: "Data Science", matches: 87, score: 91.1 },
]

const matches = [
    {
        candidateInitials: "SD",
        candidate: "Sophie Dubois",
        candidateRole: "Candidat",
        companyInitials: "TC",
        company: "TechCorp",
        position: "Développeur React Senior",
        metrics: [
            { label: "Compétences", value: "96%" },
            { label: "Expérience", value: "92%" },
            { label: "Culture", value: "94%" },
            { label: "Localisation", value: "98%" },
        ],
        tag: "Match Parfait",
        tagClass: "bg-[#2f80ed] text-white",
        score: "94%",
    },
    {
        candidateInitials: "ML",
        candidate: "Marc Leblanc",
        candidateRole: "Candidat",
        companyInitials: "IS",
        company: "InvoSoft",
        position: "Data Scientist",
        metrics: [
            { label: "Compétences", value: "89%" },
            { label: "Expérience", value: "85%" },
            { label: "Culture", value: "88%" },
            { label: "Localisation", value: "86%" },
        ],
        tag: "Très Compatible",
        tagClass: "bg-[#2f80ed] text-white",
        score: "87%",
    },
    {
        candidateInitials: "AM",
        candidate: "Alice Martin",
        candidateRole: "Candidat",
        companyInitials: "DH",
        company: "DesignHub",
        position: "UX Designer Lead",
        metrics: [
            { label: "Compétences", value: "94%" },
            { label: "Expérience", value: "88%" },
            { label: "Culture", value: "92%" },
            { label: "Localisation", value: "90%" },
        ],
        tag: "Excellente Compatibilité",
        tagClass: "bg-[#2f80ed] text-white",
        score: "91%",
    },
]

export default function Page() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Matching IA Avancé</h1>
                <p className="mt-1 text-[14px] text-[#7f8797]">
                    Algorithme intelligent de mise en relation candidats-entreprises
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="flex items-start justify-between px-4 py-4">
                            <div>
                                <p className="text-[11px] text-[#8b92a3]">{stat.title}</p>
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
                            <Zap className="h-4 w-4" />
                            Algorithme IA
                        </h2>

                        <div>
                            <p className="text-[12px] font-medium text-[#4a5162]">Critères de Matching</p>
                            <div className="mt-2 space-y-1.5">
                                {criteria.map((criterion) => (
                                    <div key={criterion.label} className="flex items-center justify-between text-[11px] text-[#4a5162]">
                                        <span>{criterion.label}</span>
                                        <span>{criterion.weight}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Performance</p>
                            <div className="space-y-2">
                                {perfBars.map((item) => (
                                    <div key={item.label} className="space-y-1">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-[#4a5162]">{item.label}</span>
                                            <span className="text-[#4a5162]">{item.value}%</span>
                                        </div>
                                        <Progress
                                            value={item.value}
                                            className="h-2 bg-[#ebeff8] [&_[data-slot=progress-indicator]]:bg-[#3f7fe8]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <TrendingUp className="h-4 w-4" />
                            Secteurs Performants
                        </h2>

                        <div className="space-y-2">
                            {sectors.map((sector) => (
                                <div key={sector.label} className="rounded-lg border border-[#ebeff6] bg-[#f8f9fc] px-3 py-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-medium text-[#2f3647]">{sector.label}</p>
                                        <p className="text-[13px] font-semibold text-[#4a5162]">{sector.score}</p>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#8a92a3]">
                                        <span>{sector.matches} matches</span>
                                        <span>Score moyen</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <Activity className="h-4 w-4" />
                            Activité Temps Réel
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-[#4a5162]">Candidats actifs</span>
                                <span className="font-semibold text-[#2f3647]">1,247</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-[#4a5162]">Offres ouvertes</span>
                                <span className="font-semibold text-[#2f3647]">348</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-[#4a5162]">Matches en cours</span>
                                <span className="font-semibold text-[#2f3647]">89</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="mt-5 h-9 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]"
                        >
                            <Activity className="h-3.5 w-3.5" />
                            Voir Dashboard Live
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[28px] font-semibold text-[#242a38]">Matches Récents</h2>

                    <div className="space-y-3">
                        {matches.map((match) => (
                            <div key={`${match.candidate}-${match.company}`} className="rounded-[10px] border border-[#e7ebf3] bg-white px-4 py-3">
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[11px] font-semibold text-white">
                                                {match.candidateInitials}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#252c3b]">{match.candidate}</p>
                                                <p className="text-[10px] text-[#8a92a3]">{match.candidateRole}</p>
                                            </div>
                                        </div>

                                        <Heart className="h-4 w-4 text-[#7f8797]" />

                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[11px] font-semibold text-white">
                                                {match.companyInitials}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#252c3b]">{match.company}</p>
                                                <p className="text-[10px] text-[#8a92a3]">{match.position}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${match.tagClass}`}>
                                            {match.tag}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]"
                                        >
                                            Voir Détails
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                                    {match.metrics.map((metric) => (
                                        <div key={metric.label} className="text-center">
                                            <p className="text-[13px] font-semibold text-[#4a5162]">{metric.value}</p>
                                            <p className="text-[10px] text-[#8a92a3]">{metric.label}</p>
                                        </div>
                                    ))}
                                    <div className="text-right">
                                        <p className="text-[32px] font-semibold leading-none text-[#232a38]">{match.score}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

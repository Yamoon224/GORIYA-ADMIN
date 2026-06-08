"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Brain,
    Target,
    Clock3,
    Zap,
    TrendingUp,
    Settings,
    CircleCheck,
    TriangleAlert,
} from "lucide-react"

const stats = [
    { label: "Scores Générés", value: "3,247", icon: Brain },
    { label: "Score Moyen Global", value: "78.4", icon: Target },
    { label: "Précision IA", value: "94.7%", icon: CircleCheck },
    { label: "Temps Traitement", value: "1.8s", icon: Zap },
]

const criteriaRows = [
    { label: "Compétences Techniques", weight: 30, score: 82 },
    { label: "Expérience Professionnelle", weight: 25, score: 78 },
    { label: "Formation & Certifications", weight: 20, score: 88 },
    { label: "Soft Skills", weight: 15, score: 75 },
    { label: "Présentation CV", weight: 10, score: 91 },
]

const bestDomains = [
    { label: "Développement", value: "86.4" },
    { label: "Design UX/UI", value: "83.7" },
    { label: "Data Science", value: "81.2" },
]

const recentRows = [
    {
        name: "Alice Dupont",
        role: "Développeuse Frontend",
        score: "94/100",
        status: "Excellent",
        statusClass: "bg-[#2f80ed] text-white",
        details: [
            { value: "96", label: "Technique" },
            { value: "89", label: "Expérience" },
            { value: "98", label: "Formation" },
            { value: "92", label: "Soft Skills" },
            { value: "95", label: "Présentation" },
        ],
        recommendation: "3 recommandations d'amélioration",
    },
    {
        name: "Marc Leblanc",
        role: "Data Analyst",
        score: "76/100",
        status: "Bon",
        statusClass: "bg-[#edf0f6] text-[#3d4354]",
        details: [
            { value: "78", label: "Technique" },
            { value: "72", label: "Expérience" },
            { value: "82", label: "Formation" },
            { value: "74", label: "Soft Skills" },
            { value: "78", label: "Présentation" },
        ],
        recommendation: "7 recommandations d'amélioration",
    },
    {
        name: "Sarah Martin",
        role: "Marketing Digital",
        score: "68/100",
        status: "Améliorable",
        statusClass: "bg-[#edf0f6] text-[#3d4354]",
        details: [
            { value: "65", label: "Technique" },
            { value: "58", label: "Expérience" },
            { value: "75", label: "Formation" },
            { value: "82", label: "Soft Skills" },
            { value: "72", label: "Présentation" },
        ],
        recommendation: "12 recommandations d'amélioration",
    },
]

export default function Page() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Scoring IA Avancé</h1>
                <p className="mt-1 text-[14px] text-[#7f8797]">
                    Algorithmes d'évaluation et scoring intelligent des profils candidats
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

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <Target className="h-4 w-4" />
                            Critères de Scoring
                        </h2>

                        <div className="space-y-3">
                            {criteriaRows.map((row) => (
                                <div key={row.label} className="space-y-1">
                                    <div className="flex items-center justify-between text-[12px]">
                                        <span className="text-[#3f4657]">{row.label}</span>
                                        <div className="flex items-center gap-3 text-[#8b92a3]">
                                            <span>Poids: {row.weight}%</span>
                                            <span className="text-[#4a5162]">{row.score}/100</span>
                                        </div>
                                    </div>
                                    <Progress
                                        value={row.score}
                                        className="h-2 bg-[#ebeff8] [&_[data-slot=progress-indicator]]:bg-[#3f7fe8]"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            className="mt-5 h-9 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]"
                        >
                            <Settings className="h-3.5 w-3.5" />
                            Ajuster les Pondérations
                        </Button>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                            <TrendingUp className="h-4 w-4" />
                            Performance Algorithme
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="flex items-center gap-1 text-[12px] font-semibold text-[#24b36f]">
                                    <CircleCheck className="h-3.5 w-3.5" />
                                    Scores Excellents
                                </p>
                                <p className="mt-1 text-[34px] font-semibold leading-none text-[#232a38]">847</p>
                                <p className="mt-1 text-[10px] text-[#8a92a3]">+15% ce mois</p>
                            </div>
                            <div>
                                <p className="flex items-center gap-1 text-[12px] font-semibold text-[#f0a04b]">
                                    <TriangleAlert className="h-3.5 w-3.5" />
                                    À Améliorer
                                </p>
                                <p className="mt-1 text-[34px] font-semibold leading-none text-[#232a38]">234</p>
                                <p className="mt-1 text-[10px] text-[#8a92a3]">-8% ce mois</p>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-[#eceff6] pt-3">
                            <p className="mb-2 text-[11px] text-[#8a92a3]">Domaines les mieux scorés</p>
                            <div className="space-y-2">
                                {bestDomains.map((domain) => (
                                    <div key={domain.label} className="flex items-center justify-between text-[12px]">
                                        <span className="text-[#3f4657]">{domain.label}</span>
                                        <span className="text-[#4a5162]">{domain.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[28px] font-semibold text-[#242a38]">Analyses Récentes</h2>

                    <div className="space-y-3">
                        {recentRows.map((row) => (
                            <div key={row.name} className="rounded-[10px] border border-[#e7ebf3] bg-white px-4 py-3">
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <p className="text-[12px] font-medium text-[#252c3b]">{row.name}</p>
                                        <p className="text-[11px] text-[#7f8797]">{row.role}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-[31px] font-semibold text-[#232a38]">{row.score}</p>
                                        <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${row.statusClass}`}>
                                            {row.status}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]"
                                        >
                                            Voir Détail
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
                                    {row.details.map((detail) => (
                                        <div key={detail.label} className="text-center">
                                            <p className="text-[13px] font-semibold text-[#4a5162]">{detail.value}</p>
                                            <p className="text-[10px] text-[#8a92a3]">{detail.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-[#edf0f6] pt-2">
                                    <p className="text-[10px] text-[#8a92a3]">{row.recommendation}</p>
                                    <Button variant="ghost" className="h-7 rounded-md px-2 text-[11px] text-[#4d5567] hover:bg-[#f5f7fc]">
                                        Générer Rapport
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

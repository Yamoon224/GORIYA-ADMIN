"use client"

import type React from "react"

import { useRef, useState } from "react"
import {
    ArrowUpFromLine,
    FileText,
    Sparkles,
    BarChart3,
    Brain,
    Award,
    ClipboardList,
    Upload,
    Layers3,
    Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cvService } from "@/lib/services/cv.service"

const stats = [
    {
        label: "CV Analysés",
        value: "45,623",
        note: "Ce mois",
        growth: "+23% par rapport au mois dernier",
        icon: FileText,
        iconClass: "bg-[#8e5df5]",
        borderClass: "border-[#dcd4ff]",
    },
    {
        label: "Score Moyen",
        value: "83%",
        note: "Performance globale",
        growth: "+8% par rapport au mois dernier",
        icon: Award,
        iconClass: "bg-[#27c48f]",
        borderClass: "border-[#a9ebcf]",
    },
    {
        label: "Taux de Réussite",
        value: "94%",
        note: "Analyses réussies",
        growth: "+12% par rapport au mois dernier",
        icon: BarChart3,
        iconClass: "bg-[#4c8df6]",
        borderClass: "border-[#c8d9ff]",
    },
    {
        label: "Amélioration",
        value: "+23%",
        note: "Vs mois précédent",
        growth: "+12% par rapport au mois dernier",
        icon: Sparkles,
        iconClass: "bg-[#f0a04b]",
        borderClass: "border-[#ffd6ad]",
    },
]

const sectionScores = [
    { label: "En-tête & Contact", value: 85 },
    { label: "Expérience Professionnelle", value: 87 },
    { label: "Compétences", value: 82 },
    { label: "Formation", value: 80 },
]

const recentAnalyses = [
    { name: "Marie Dubois", file: "CV-Marie-Dubois.pdf", date: "2024-03-15 10:30", score: 87, strengths: 8, improvements: 3, status: "Complète" },
    { name: "Jean Martin", file: "Jean_Martin_Resume.pdf", date: "2024-03-15 11:15", score: 94, strengths: 12, improvements: 2, status: "Complète" },
    { name: "Sophie Laurent", file: "CV-Sophie-2024.pdf", date: "2024-03-15 14:20", score: 76, strengths: 6, improvements: 5, status: "En cours" },
]

export default function Page() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            await cvService.analyzeCV(file as any)
        } catch (error) {
            console.error("Erreur lors de l'analyse:", error)
        } finally {
            setIsUploading(false)
            event.target.value = ""
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Analyse IA des CV</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">Analysez et évaluez les CV avec l'intelligence artificielle</p>
                </div>

                <Button className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Nouvelle Analyse
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <KpiCard key={stat.label} {...stat} />
                ))}
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <div className="rounded-[10px] border-2 border-dashed border-[#d9cdfd] bg-[#fbf9ff] px-4 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6ff0] text-white shadow-sm">
                            <ArrowUpFromLine className="h-6 w-6" />
                        </div>
                        <h2 className="text-[18px] font-semibold text-[#232939]">Analyser un nouveau CV</h2>
                        <p className="mt-2 text-[12px] text-[#7f8797]">
                            Glissez-déposez un fichier PDF ou Word, ou cliquez pour sélectionner
                        </p>
                        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="h-9 rounded-full bg-[#2f6ff0] px-5 text-[12px] font-semibold text-white hover:bg-[#1f5be2]"
                            >
                                <Upload className="h-3.5 w-3.5" />
                                {isUploading ? "Analyse en cours..." : "Sélectionner un fichier"}
                            </Button>
                            <Button variant="outline" className="h-9 rounded-full border-[#e4e7f0] bg-white px-5 text-[12px] text-[#4c5466] hover:bg-[#f5f7fc]">
                                Analyser par lot
                            </Button>
                        </div>
                        <p className="mt-4 text-[11px] text-[#8a92a3]">Formats acceptés: PDF, DOC, DOCX - Taille max: 10MB</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <div className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#242a38]">
                            <Brain className="h-4 w-4 text-[#7a5af8]" />
                            Dernier CV Analysé: Marie Dubois
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr]">
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-[13px] font-semibold text-[#242a38]">Score Global</p>
                                        <p className="text-[12px] text-[#7f8797]">Évaluation générale du profil</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[18px] font-semibold text-[#2f6ff0]">87%</p>
                                        <Progress value={87} className="mt-1 h-2 w-24 bg-[#ebeff8]" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="mb-2 text-[12px] font-semibold text-[#24b36f]">Points Forts (8)</p>
                                        <ul className="space-y-1 text-[11px] text-[#4a5162]">
                                            <li>• Expérience pertinente en marketing digital</li>
                                            <li>• Compétences techniques bien détaillées</li>
                                            <li>• Formation cohérente avec le domaine</li>
                                            <li>• Présentation claire et structurée</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-[12px] font-semibold text-[#f0a04b]">Améliorations (3)</p>
                                        <ul className="space-y-1 text-[11px] text-[#4a5162]">
                                            <li>• Ajouter des chiffres dans les réalisations</li>
                                            <li>• Optimiser le résumé professionnel</li>
                                            <li>• Inclure plus de mots-clés sectoriels</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="mb-2 text-[12px] font-semibold text-[#242a38]">Analyse par Section</p>
                                    <div className="space-y-2">
                                        {sectionScores.map((section) => (
                                            <div key={section.label} className="flex items-center justify-between gap-3 text-[11px]">
                                                <span className="w-44 text-[#4a5162]">{section.label}</span>
                                                <Progress value={section.value} className="h-2 flex-1 bg-[#ebeff8]" />
                                                <span className="w-8 text-right text-[#8b92a3]">{section.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start justify-end">
                                <div className="w-full max-w-[220px] rounded-[10px] bg-[#fbfcff] p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[13px] font-semibold text-[#242a38]">Points Clés</p>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { label: "Présentation", value: "92%", icon: ClipboardList, color: "text-[#2f6ff0]" },
                                                { label: "Structure", value: "89%", icon: Layers3, color: "text-[#27c48f]" },
                                                { label: "Lisibilité", value: "85%", icon: Eye, color: "text-[#f0a04b]" },
                                            ].map((item) => (
                                                <div key={item.label} className="flex items-center justify-between rounded-lg border border-[#eef1f7] bg-white px-3 py-2 text-[11px]">
                                                    <div className="flex items-center gap-2 text-[#4a5162]">
                                                        <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                                                        {item.label}
                                                    </div>
                                                    <span className="font-semibold text-[#2d3443]">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="outline" className="mt-2 h-9 w-full rounded-lg border-[#e4e7f0] bg-white px-3 text-[11px] text-[#4c5466] hover:bg-[#f5f7fc]">
                                            Rapport Complet PDF
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <div className="mb-3 text-[14px] font-semibold text-[#242a38]">Recommandations IA</div>
                        <div className="space-y-3">
                            <RecommendationCard
                                title="Optimisation Immédiate"
                                titleClass="text-[#9b5cf8]"
                                bgClass="bg-[#f6efff]"
                                borderClass="border-[#eadcff]"
                                description="Ajouter des métriques de performance dans la section expérience pour augmenter le score de 12 points."
                            />
                            <RecommendationCard
                                title="Adaptation Sectorielle"
                                titleClass="text-[#26b887]"
                                bgClass="bg-[#eefaf4]"
                                borderClass="border-[#d7f3e6]"
                                description="CV bien adapté pour le secteur marketing digital. Excellente cohérence."
                            />
                            <RecommendationCard
                                title="Suggestion Formation"
                                titleClass="text-[#f0a04b]"
                                bgClass="bg-[#fff6ea]"
                                borderClass="border-[#ffe5c4]"
                                description="Considérer une certification Google Analytics pour renforcer le profil."
                            />
                        </div>

                        <Button variant="outline" className="mt-4 h-9 w-full rounded-lg border-[#e4e7f0] bg-white px-3 text-[11px] text-[#4c5466] hover:bg-[#f5f7fc]">
                            <ArrowUpFromLine className="h-3.5 w-3.5" />
                            Rapport Complet PDF
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[18px] font-semibold text-[#242a38]">Analyses Récentes</h2>
                    <div className="space-y-3">
                        {recentAnalyses.map((analysis) => (
                            <div
                                key={analysis.name}
                                className="flex flex-col gap-3 rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3 lg:flex-row lg:items-center lg:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5f55ff] text-[11px] font-semibold text-white">
                                        {analysis.name
                                            .split(" ")
                                            .map((part) => part[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-medium text-[#252c3b]">{analysis.name}</p>
                                        <p className="text-[11px] text-[#7f8797]">{analysis.file}</p>
                                        <p className="text-[10px] text-[#a1a7b6]">{analysis.date}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                                    <div className="text-right">
                                        <p className="text-[13px] font-semibold text-[#9b5cf8]">{analysis.score}%</p>
                                        <p className="text-[10px] text-[#8a92a3]">Score</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[13px] font-semibold text-[#24b36f]">{analysis.strengths}</p>
                                        <p className="text-[10px] text-[#8a92a3]">Points forts</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[13px] font-semibold text-[#f0a04b]">{analysis.improvements}</p>
                                        <p className="text-[10px] text-[#8a92a3]">Améliorations</p>
                                    </div>
                                    <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${analysis.status === "Complète" ? "bg-[#24bf7e] text-white" : "bg-[#edf0f6] text-[#3d4354]"}`}>
                                        {analysis.status}
                                    </Badge>
                                    <Button variant="outline" className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                        Détails
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

type KpiCardProps = {
    label: string
    value: string
    note: string
    growth: string
    icon: React.ComponentType<{ className?: string }>
    iconClass: string
    borderClass: string
}

function KpiCard({ label, value, note, growth, icon: Icon, iconClass, borderClass }: KpiCardProps) {
    return (
        <Card className={`rounded-[10px] border bg-white py-0 shadow-none ${borderClass}`}>
            <CardContent className="flex items-start justify-between px-4 py-4">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{label}</p>
                    <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                    <p className="mt-1 text-[10px] text-[#8b92a3]">{note}</p>
                    <p className="mt-1 text-[10px] text-[#23b26f]">{growth}</p>
                </div>
                <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardContent>
        </Card>
    )
}

type RecommendationCardProps = {
    title: string
    description: string
    titleClass: string
    bgClass: string
    borderClass: string
}

function RecommendationCard({ title, description, titleClass, bgClass, borderClass }: RecommendationCardProps) {
    return (
        <div className={`rounded-[10px] border px-3 py-3 ${bgClass} ${borderClass}`}>
            <p className={`text-[12px] font-semibold ${titleClass}`}>{title}</p>
            <p className="mt-1 text-[11px] text-[#6c7383]">{description}</p>
        </div>
    )
}

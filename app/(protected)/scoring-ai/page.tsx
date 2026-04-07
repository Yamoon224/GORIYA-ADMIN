"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Clock, Target, BarChart3, Settings, Zap } from "lucide-react"
import type { IScoringResult } from "@/lib/@types/entities"
import type { IScoringCriteria } from "@/lib/services/scoring.service"

export default function Page() {
    const [stats, setStats] = useState<{
        generatedScores: number
        averageScore: number
        accuracy: number
        averageTime: string
    } | null>(null)
    const [criteria, setCriteria] = useState<IScoringCriteria[]>([])
    const [recentAnalyses, setRecentAnalyses] = useState<IScoringResult[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            // Données de démonstration
            setStats({
                generatedScores: 2247,
                averageScore: 78.4,
                accuracy: 94.7,
                averageTime: "1.8s",
            })

            setCriteria([
                { name: "Compétences Techniques", weight: 30, score: 85, maxScore: 100 },
                { name: "Expérience Professionnelle", weight: 25, score: 78, maxScore: 100 },
                { name: "Formation & Certifications", weight: 20, score: 92, maxScore: 100 },
                { name: "Soft Skills", weight: 15, score: 74, maxScore: 100 },
                { name: "Présentation CV", weight: 10, score: 88, maxScore: 100 },
            ])

            setRecentAnalyses([
                {
                    id: "1",
                    candidateName: "Alice Dupont",
                    candidateEmail: "alice.dupont@email.com",
                    position: "Développeur Full Stack",
                    overallScore: 94,
                    criteria: [],
                    analysisDate: "2024-01-16T10:30:00Z",
                    avatar: "/placeholder.svg?height=40&width=40",
                    status: "completed",
                },
                {
                    id: "2",
                    candidateName: "Marc Leblanc",
                    candidateEmail: "marc.leblanc@email.com",
                    position: "UX Designer",
                    overallScore: 78,
                    criteria: [],
                    analysisDate: "2024-01-16T09:15:00Z",
                    avatar: "/placeholder.svg?height=40&width=40",
                    status: "completed",
                },
                {
                    id: "3",
                    candidateName: "Sarah Martin",
                    candidateEmail: "sarah.martin@email.com",
                    position: "Data Scientist",
                    overallScore: 89,
                    criteria: [],
                    analysisDate: "2024-01-16T08:45:00Z",
                    avatar: "/placeholder.svg?height=40&width=40",
                    status: "completed",
                },
            ])
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="p-6">Chargement...</div>
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Scoring IA Avancé</h1>
                    <p className="text-gray-600">Analyse et score les candidats avec des algorithmes avancés</p>
                </div>
                <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Nouvelle Analyse
                </Button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Scores Générés</p>
                                <p className="text-2xl font-bold text-blue-600">{stats?.generatedScores.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Brain className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Score Moyen</p>
                                <p className="text-2xl font-bold text-green-600">{stats?.averageScore}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Précision</p>
                                <p className="text-2xl font-bold text-purple-600">{stats?.accuracy}%</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Temps Moyen</p>
                                <p className="text-2xl font-bold text-orange-600">{stats?.averageTime}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critères de Scoring */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Critères de Scoring
                            </CardTitle>
                            <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-2" />
                                Configurer
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {criteria.map((criterion, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">{criterion.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">{criterion.weight}%</span>
                                        <span className="text-sm font-bold">
                                            {criterion.score}/{criterion.maxScore}
                                        </span>
                                    </div>
                                </div>
                                <Progress value={criterion.score} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Performances Algorithmiques */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            Performances Algorithmiques
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-sm">
                                <p className="text-2xl font-bold text-blue-600">847</p>
                                <p className="text-sm text-gray-600">Analyses Complètes</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-sm">
                                <p className="text-2xl font-bold text-green-600">234</p>
                                <p className="text-sm text-gray-600">Recommandations</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Précision Technique</span>
                                <span className="text-sm font-bold">96.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Évaluation Expérience</span>
                                <span className="text-sm font-bold">94.8%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Analyse Soft Skills</span>
                                <span className="text-sm font-bold">91.5%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Score Global</span>
                                <span className="text-sm font-bold">94.2%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analyses Récentes */}
            <Card>
                <CardHeader>
                    <CardTitle>Analyses Récentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentAnalyses.map((analysis) => (
                            <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-sm">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={analysis.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>
                                            {analysis.candidateName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{analysis.candidateName}</h3>
                                        <p className="text-sm text-gray-600">{analysis.position}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(analysis.analysisDate).toLocaleDateString("fr-FR")} à{" "}
                                            {new Date(analysis.analysisDate).toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">{analysis.overallScore}/100</p>
                                        <p className="text-xs text-gray-600">Score Global</p>
                                    </div>
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                        Terminé
                                    </Badge>
                                    <Button size="sm" variant="outline">
                                        Voir Rapport
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

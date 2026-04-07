"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingUp, Target, Users, Eye, MoreHorizontal } from "lucide-react"
import { matchingService } from "@/lib/services/matching.service"
import type { IMatchingResult } from "@/lib/@types/entities"

export default function Page() {
    const [stats, setStats] = useState({
        matchingsEnCours: 127,
        tauxReussite: 95.7,
        precisionGlobale: 73.4,
        nouveauxMatchs: 49,
    })
    const [algorithmPerformance, setAlgorithmPerformance] = useState([
        { name: "Correspondance CV", score: 94.2, color: "bg-blue-500" },
        { name: "Évaluation", score: 89.1, color: "bg-teal-500" },
        { name: "Compétences", score: 92.4, color: "bg-green-500" },
        { name: "Localisation", score: 78.3, color: "bg-orange-500" },
    ])
    const [recentMatches, setRecentMatches] = useState<IMatchingResult[]>([])
    const [activityFeed, setActivityFeed] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [statsData, algorithmsData, matchesData, activityData] = await Promise.all([
                matchingService.getStats(),
                matchingService.getAlgorithmPerformance(),
                matchingService.getRecentMatches(),
                matchingService.getActivityFeed(),
            ])
            setStats(statsData)
            setAlgorithmPerformance(algorithmsData)
            setRecentMatches(matchesData)
            setActivityFeed(activityData)
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
            // Mock data for demo
            setRecentMatches([
                {
                    id: "1",
                    candidateName: "Sophie Dubois",
                    candidateEmail: "sophie.dubois@email.com",
                    position: "Développeur Full Stack",
                    company: "TechStart",
                    matchingScore: 94,
                    status: "nouveau",
                    matchDate: "2024-01-15",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "2",
                    candidateName: "Marc Duval",
                    candidateEmail: "marc.duval@email.com",
                    position: "Data Analyst",
                    company: "DataCorp",
                    matchingScore: 87,
                    status: "en_cours",
                    matchDate: "2024-01-14",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "3",
                    candidateName: "Alice Martin",
                    candidateEmail: "alice.martin@email.com",
                    position: "UX Designer",
                    company: "DesignHub",
                    matchingScore: 91,
                    status: "finalise",
                    matchDate: "2024-01-13",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "4",
                    candidateName: "David Chen",
                    candidateEmail: "david.chen@email.com",
                    position: "DevOps Engineer",
                    company: "CloudTech",
                    matchingScore: 88,
                    status: "nouveau",
                    matchDate: "2024-01-12",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "5",
                    candidateName: "Emma Wilson",
                    candidateEmail: "emma.wilson@email.com",
                    position: "Product Manager",
                    company: "InnovateCorp",
                    matchingScore: 85,
                    status: "en_cours",
                    matchDate: "2024-01-11",
                    avatar: "/placeholder-user.jpg",
                },
            ])
        }
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            nouveau: { label: "Nouveau", color: "bg-blue-100 text-blue-800" },
            en_cours: { label: "En cours", color: "bg-yellow-100 text-yellow-800" },
            finalise: { label: "Finalisé", color: "bg-green-100 text-green-800" },
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.nouveau
        return <Badge className={config.color}>{config.label}</Badge>
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Matching IA Avancé</h1>
                    <p className="text-gray-600">Algorithmes avancés de mise en relation candidats-entreprises</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Matchings en Cours</p>
                                <p className="text-2xl font-bold">{stats.matchingsEnCours}</p>
                                <p className="text-xs text-gray-500">Processus actifs</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Taux de Réussite</p>
                                <p className="text-2xl font-bold">{stats.tauxReussite}%</p>
                                <p className="text-xs text-gray-500">Matchings réussis</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-sm flex items-center justify-center">
                                <Target className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Précision Globale</p>
                                <p className="text-2xl font-bold">{stats.precisionGlobale}%</p>
                                <p className="text-xs text-gray-500">Algorithme IA</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Nouveaux Matchs</p>
                                <p className="text-2xl font-bold">{stats.nouveauxMatchs}</p>
                                <p className="text-xs text-gray-500">Dernières 24h</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Algorithm Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Algorithmes IA</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            {algorithmPerformance.map((algorithm, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{algorithm.name}</span>
                                        <span className="text-sm font-bold">{algorithm.score}%</span>
                                    </div>
                                    <Progress value={algorithm.score} className="h-2" />
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="font-medium mb-3">Sections Performantes</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Analyse CV</span>
                                        <span className="font-medium">94.2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Évaluation</span>
                                        <span className="font-medium">89.1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Compétences</span>
                                        <span className="font-medium">92.4</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Localisation</span>
                                        <span className="font-medium">78.3</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Expérience</span>
                                        <span className="font-medium">86.7</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Formation</span>
                                        <span className="font-medium">91.2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activité Temps Réel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Nouveau matching détecté</p>
                                    <p className="text-xs text-gray-600">Sophie Dubois → Développeur Full Stack chez TechStart</p>
                                    <p className="text-xs text-gray-500">Il y a 2 minutes</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Matching finalisé</p>
                                    <p className="text-xs text-gray-600">Alice Martin acceptée chez DesignHub</p>
                                    <p className="text-xs text-gray-500">Il y a 15 minutes</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-sm">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Algorithme mis à jour</p>
                                    <p className="text-xs text-gray-600">Amélioration de la précision de 2.3%</p>
                                    <p className="text-xs text-gray-500">Il y a 1 heure</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-sm">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Analyse de performance</p>
                                    <p className="text-xs text-gray-600">Rapport hebdomadaire généré</p>
                                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Matches */}
            <Card>
                <CardHeader>
                    <CardTitle>Meilleurs Matchs Récents</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentMatches.map((match) => (
                            <div key={match.id} className="flex items-center justify-between p-4 border rounded-sm hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                        {match.candidateName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{match.candidateName}</h3>
                                        <p className="text-sm text-gray-600">{match.candidateEmail}</p>
                                        <p className="text-sm text-gray-500">
                                            {match.position} chez {match.company}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Score Match</p>
                                        <p className="text-lg font-bold text-blue-600">{match.matchingScore}%</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Détecté le</p>
                                        <p className="text-sm font-medium">{new Date(match.matchDate).toLocaleDateString("fr-FR")}</p>
                                    </div>

                                    {getStatusBadge(match.status)}

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-4 h-4 mr-1" />
                                            Voir Détails
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
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

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, TrendingUp, Users, Zap } from "lucide-react"
import { cvService } from "@/lib/services/cv.service"
import type { ICVAnalysis } from "@/lib/@types/entities"

export default function Page() {
    const [stats, setStats] = useState({
        analyzedCVs: 43623,
        analysisAccuracy: 81,
        userSatisfaction: 84,
        efficiencyImprovement: 321,
    })
    const [recentAnalyses, setRecentAnalyses] = useState<ICVAnalysis[]>([])
    const [recommendations, setRecommendations] = useState([])
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [statsData, analysesData, recommendationsData] = await Promise.all([
                cvService.getStats(),
                cvService.getRecentAnalyses(),
                cvService.getRecommendations(),
            ])
            setStats(statsData)
            setRecentAnalyses(analysesData)
            setRecommendations(recommendationsData)
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error)
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            await cvService.analyzeCV(file as any)
            await loadData() // Recharger les données
        } catch (error) {
            console.error("Erreur lors de l'analyse:", error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analyse IA des CV</h1>
                    <p className="text-gray-600">Analysez et évaluez les CV avec notre intelligence artificielle avancée</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Nouveau Candidat
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">CV Analysés</p>
                                <p className="text-2xl font-bold">{stats.analyzedCVs.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Depuis le lancement</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Précision d'Analyse</p>
                                <p className="text-2xl font-bold">{stats.analysisAccuracy}%</p>
                                <p className="text-xs text-gray-500">Taux de précision moyen</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Satisfaction Utilisateur</p>
                                <p className="text-2xl font-bold">{stats.userSatisfaction}%</p>
                                <p className="text-xs text-gray-500">Retours positifs</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Amélioration Efficacité</p>
                                <p className="text-2xl font-bold">{stats.efficiencyImprovement}%</p>
                                <p className="text-xs text-gray-500">Gain de temps moyen</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <Zap className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upload Section */}
            <Card>
                <CardContent className="p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Analyser un nouveau CV</h3>
                        <p className="text-gray-600 mb-4">
                            Téléchargez un CV pour une analyse IA complète et des recommandations personnalisées
                        </p>
                        <div className="flex items-center justify-center">
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                                <Button disabled={isUploading} className="bg-blue-600 hover:bg-blue-700">
                                    {isUploading ? "Analyse en cours..." : "Sélectionner un fichier"}
                                </Button>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Formats acceptés: PDF, DOC, DOCX (max 10MB)</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Analyses */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Derniers CV Analysés Détails
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                                <div>
                                    <p className="font-medium">Score Global</p>
                                    <p className="text-sm text-gray-600">Évaluation générale du profil</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-600">87%</p>
                                    <Progress value={87} className="w-20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Compétences techniques</span>
                                    <span className="text-sm font-medium">90%</span>
                                </div>
                                <Progress value={90} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Expérience Professionnelle</span>
                                    <span className="text-sm font-medium">85%</span>
                                </div>
                                <Progress value={85} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Formation</span>
                                    <span className="text-sm font-medium">92%</span>
                                </div>
                                <Progress value={92} />
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="font-medium mb-2">Analyse par Section</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Profil</span>
                                    <span className="text-blue-600">88%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Éducation</span>
                                    <span className="text-blue-600">92%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Compétences</span>
                                    <span className="text-blue-600">85%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Expérience</span>
                                    <span className="text-blue-600">90%</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recommandations IA</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-sm border-l-4 border-blue-500">
                                <div className="flex items-start gap-2">
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        Qualification Immédiate
                                    </Badge>
                                </div>
                                <p className="text-sm mt-2">
                                    Ce candidat possède toutes les compétences requises pour le poste de Développeur Senior.
                                    Recommandation forte pour un entretien.
                                </p>
                            </div>

                            <div className="p-3 bg-green-50 rounded-sm border-l-4 border-green-500">
                                <div className="flex items-start gap-2">
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Suggestion Spécialisée
                                    </Badge>
                                </div>
                                <p className="text-sm mt-2">
                                    Profil excellent pour les postes en Data Science. Expérience solide en Machine Learning et Python.
                                </p>
                            </div>

                            <div className="p-3 bg-orange-50 rounded-sm border-l-4 border-orange-500">
                                <div className="flex items-start gap-2">
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                        Suggestion Formation
                                    </Badge>
                                </div>
                                <p className="text-sm mt-2">
                                    Candidat prometteur qui bénéficierait d'une formation complémentaire en gestion de projet.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <h4 className="font-medium mb-3">Analyses Récentes</h4>
                            <div className="space-y-3">
                                {[
                                    { name: "Marie Dubois", score: 87, status: "Excellent" },
                                    { name: "Jean Martin", score: 84, status: "Très Bon" },
                                    { name: "Sophie Laurent", score: 76, status: "Moyen" },
                                ].map((analysis, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                {analysis.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{analysis.name}</p>
                                                <p className="text-xs text-gray-600">Analysé récemment</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{analysis.score}%</p>
                                            <Badge variant="outline" className="text-xs">
                                                {analysis.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

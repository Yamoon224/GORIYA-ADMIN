"use client"

import { useEffect, useState } from "react"
import { Users, Building2, FileText, Briefcase, TrendingUp, UserCheck, Calendar, MessageSquare } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dashboardService } from "@/lib/services/dashboard.service"

export default function Page() {
    const [stats, setStats] = useState<{
        activeStudents: number
        partnerCompanies: number
        analyzedCVs: number
        jobOffers: number
    }>({
        activeStudents: 12847,
        partnerCompanies: 1234,
        analyzedCVs: 45623,
        jobOffers: 8456,
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getAdminStats()
                const payload = data?.data ?? data as any
                if (payload?.activeStudents !== undefined) {
                    setStats(payload)
                }
            } catch (error) {
                console.error("Error fetching stats:", error)
            }
        }

        fetchStats()
    }, [])

    const quickActions = [
        { icon: UserCheck, label: "Vérifier un CV", color: "text-blue-600" },
        { icon: Calendar, label: "Nouvelle Offre", color: "text-green-600" },
        { icon: MessageSquare, label: "Simulation Entretien", color: "text-purple-600" },
        { icon: TrendingUp, label: "Rapport Formation", color: "text-orange-600" },
    ]

    return (
        <div className="p-4 space-y-2">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Tableau de Bord Goriya</h1>
                <p className="text-blue-100">
                    Gérez votre plateforme d'emploi IA, analysez les performances et optimisez l'expérience utilisateur pour
                    étudiants et entreprises.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Étudiants Actifs"
                    value={stats.activeStudents.toLocaleString()}
                    subtitle="Étudiants actifs sur la plateforme"
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Entreprises Partenaires"
                    value={stats.partnerCompanies.toLocaleString()}
                    subtitle="Entreprises partenaires actives"
                    icon={Building2}
                    color="bg-green-500"
                />
                <StatsCard
                    title="CV Analysés 30j"
                    value={stats.analyzedCVs.toLocaleString()}
                    subtitle="CV analysés par notre IA"
                    icon={FileText}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Offres d'Emploi"
                    value={stats.jobOffers.toLocaleString()}
                    subtitle="Offres d'emploi disponibles"
                    icon={Briefcase}
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-2">
                    <PerformanceChart />
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions Rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {quickActions.map((action, index) => (
                            <Button key={index} variant="ghost" className="w-full justify-start gap-3 h-12">
                                <action.icon className={`w-5 h-5 ${action.color}`} />
                                {action.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Croissance Mensuelle
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Nouveaux Candidats</span>
                                <span className="font-semibold text-green-600">+2,847</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Entreprises Inscrites</span>
                                <span className="font-semibold text-green-600">+92</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">CV Traités IA</span>
                                <span className="font-semibold text-green-600">+5,234</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Matchs Réussis</span>
                                <span className="font-semibold text-green-600">+1,456</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Partenariats Formation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Coursera</span>
                                <Button variant="outline" size="sm">
                                    Gérer
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Meta Blueprint</span>
                                <Button variant="outline" size="sm">
                                    Gérer
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Google Cours</span>
                                <Button variant="outline" size="sm">
                                    Gérer
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">IBM SkillsBuild</span>
                                <Button variant="outline" size="sm">
                                    Gérer
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

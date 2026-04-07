"use client"

import { useEffect, useState } from "react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { analyticsService } from "@/lib/services/analytics.service"
import { BarChart3, TrendingUp, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"

const evolutionData = [
    { month: "Fév", value: 800 },
    { month: "Mar", value: 1200 },
    { month: "Avr", value: 1600 },
    { month: "Mai", value: 2000 },
    { month: "Juin", value: 2400 },
]

const activityData = [
    { name: "CV Analysés", value: 45, color: "#3B82F6" },
    { name: "Entretiens", value: 30, color: "#10B981" },
    { name: "Matchings", value: 25, color: "#F59E0B" },
]

const monthlyActivity = [
    { month: "Jan", value: 180 },
    { month: "Fév", value: 220 },
    { month: "Mar", value: 200 },
    { month: "Avr", value: 280 },
    { month: "Mai", value: 320 },
    { month: "Juin", value: 350 },
    { month: "Juil", value: 380 },
]

const userDistribution = [
    { name: "Étudiants actifs", value: 60, color: "#3B82F6" },
    { name: "Entreprises", value: 25, color: "#10B981" },
    { name: "Partenaires RH", value: 15, color: "#8B5CF6" },
]

export default function Page() {
    type AnalyticsData = { analyzedCVs: number; successfulInterviews: number; matchingRate: number; averageAnalysisTime: string; evolutionData: Array<{ month: string; value: number }>; activityDistribution: Array<{ name: string; value: number; color: string }> }
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        analyzedCVs: 14250,
        successfulInterviews: 5640,
        matchingRate: 78.6,
        averageAnalysisTime: "2.4min",
        evolutionData: [],
        activityDistribution: [],
    })

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await analyticsService.getAnalytics()
                setAnalytics(data.data)
            } catch (error) {
                console.error("Error fetching analytics:", error)
            }
        }

        fetchAnalytics()
    }, [])

    return (
        <div className="p-2 lg:p-6 space-y-4">
            {/* Header */}
            <div>
                <h1 className="text-xl lg:text-2xl font-bold">Analytics & Rapports</h1>
                <p className="text-gray-600 text-sm lg:text-base">
                    Analysez et décortiquez les performances de la plateforme Goriya
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="CV Analysés Total"
                    value={analytics.analyzedCVs.toLocaleString()}
                    subtitle="Total des CV analysés"
                    icon={BarChart3}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Entretiens Réussis"
                    value={analytics.successfulInterviews.toLocaleString()}
                    subtitle="Entretiens menés avec succès"
                    icon={Target}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Taux de Matching"
                    value={`${analytics.matchingRate}%`}
                    subtitle="Taux de matching global"
                    icon={TrendingUp}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Temps Moyen Analyse"
                    value={analytics.averageAnalysisTime}
                    subtitle="Temps moyen d'analyse CV"
                    icon={Clock}
                    color="bg-orange-500"
                />
            </div>

            {/* Charts */}
            <div className="space-y-4">
                {/* First row of charts */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {/* Evolution Chart */}
                    <Card className="min-w-0 w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5" />
                                Évolution des Analyses
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-hidden">
                            <ChartContainer 
                                config={{
                                    value: { label: "Analyses", color: "hsl(var(--chart-1))" },
                                }}
                                className="w-full h-[250px] lg:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" fontSize={12} />
                                        <YAxis fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="url(#colorValue)" fillOpacity={1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Activity Distribution */}
                    <Card className="min-w-0 w-full">
                        <CardHeader>
                            <CardTitle className="text-base lg:text-lg">Répartition des Activités</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-hidden">
                            <ChartContainer 
                                config={{
                                    value: {
                                      label: "Analyses",   // ou "Activité", "Utilisateurs", selon le chart
                                      color: "hsl(var(--chart-1))", // couleur correspondant au chart
                                    },
                                }}
                                className="w-full h-[250px] lg:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={activityData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {activityData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {activityData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs lg:text-sm">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Second row of charts */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {/* Monthly Activity */}
                    <Card className="min-w-0 w-full">
                        <CardHeader>
                            <CardTitle className="text-base lg:text-lg">Activité Mensuelle</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-hidden">
                            <ChartContainer 
                                config={{
                                    value: {
                                      label: "Analyses",   // ou "Activité", "Utilisateurs", selon le chart
                                      color: "hsl(var(--chart-1))", // couleur correspondant au chart
                                    },
                                }}
                                className="w-full h-[250px] lg:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="month" fontSize={12} />
                                        <YAxis fontSize={12} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* User Distribution */}
                    <Card className="min-w-0 w-full">
                        <CardHeader>
                            <CardTitle className="text-base lg:text-lg">Répartition des Utilisateurs</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-hidden">
                            <ChartContainer 
                                config={{
                                    value: {
                                    label: "Analyses",   // ou "Activité", "Utilisateurs", selon le chart
                                    color: "hsl(var(--chart-1))", // couleur correspondant au chart
                                    },
                                }}
                                className="w-full h-[250px] lg:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={userDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                                            {userDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs lg:text-sm">
                                {userDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

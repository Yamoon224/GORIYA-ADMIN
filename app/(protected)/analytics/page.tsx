"use client"

import { useEffect, useState } from "react"
import { analyticsService } from "@/lib/services/analytics.service"
import { BarChart3, Users, Target, Clock3, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"

const evolutionData = [
    { month: "Jan", value: 1120 },
    { month: "Fev", value: 1560 },
    { month: "Mar", value: 1860 },
    { month: "Avr", value: 2090 },
    { month: "Mai", value: 2430 },
    { month: "Juin", value: 2680 },
]

const activityData = [
    { name: "CV analyses", value: 36, color: "#f59e0b" },
    { name: "Entretiens", value: 40, color: "#2f80ed" },
    { name: "Matchings", value: 24, color: "#34a853" },
]

const monthlyActivity = [
    { month: "Jan", cv: 11000, entretiens: 4000 },
    { month: "Fev", cv: 15000, entretiens: 5000 },
    { month: "Mar", cv: 18000, entretiens: 6000 },
    { month: "Avr", cv: 0, entretiens: 8200 },
    { month: "Mai", cv: 0, entretiens: 9000 },
    { month: "Juin", cv: 0, entretiens: 9600 },
]

const userDistribution = [
    { name: "Etudiants", value: 65, color: "#3f7fe8" },
    { name: "Professionnels", value: 25, color: "#27ae60" },
    { name: "Diplomes", value: 10, color: "#7b61ff" },
]

export default function Page() {
    type AnalyticsData = {
        analyzedCVs: number
        successfulInterviews: number
        matchingRate: number
        averageAnalysisTime: string
    }

    const [analytics, setAnalytics] = useState<AnalyticsData>({
        analyzedCVs: 14250,
        successfulInterviews: 5840,
        matchingRate: 78.6,
        averageAnalysisTime: "2.4min",
    })

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await analyticsService.getAnalytics()
                const payload = (data as any)?.data ?? (data as any)
                if (payload?.analyzedCVs !== undefined) {
                    setAnalytics({
                        analyzedCVs: payload.analyzedCVs,
                        successfulInterviews: payload.successfulInterviews,
                        matchingRate: payload.matchingRate,
                        averageAnalysisTime: payload.averageAnalysisTime,
                    })
                }
            } catch (error) {
                console.error("Error fetching analytics:", error)
            }
        }

        fetchAnalytics()
    }, [])

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[40px] font-semibold leading-tight text-[#242a38]">Analytics & Rapports</h1>
                <p className="mt-1 text-[14px] text-[#7f8797]">Analyse detaillee des performances de la plateforme Goriya</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard title="CV Analyses Total" value={analytics.analyzedCVs.toLocaleString()} icon={BarChart3} />
                <KpiCard title="Entretiens Simules" value={analytics.successfulInterviews.toLocaleString()} icon={Users} />
                <KpiCard title="Taux de Matching" value={`${analytics.matchingRate}%`} icon={Target} />
                <KpiCard title="Temps Moyen Analyse" value={analytics.averageAnalysisTime} icon={Clock3} />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-[33px] font-semibold text-[#242a38]">
                            <TrendingUp className="h-4 w-4 text-[#1f2533]" />
                            Evolution des Analyses
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={evolutionData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="evolutionGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1f53cc" stopOpacity={0.9} />
                                            <stop offset="100%" stopColor="#1f53cc" stopOpacity={0.16} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="#e8ebf2" strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fill: "#72809a", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        tick={{ fill: "#72809a", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 700, 1400, 2100, 2800]}
                                        domain={[0, 2800]}
                                    />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="#1241bd" strokeWidth={2} fill="url(#evolutionGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-[33px] font-semibold text-[#242a38]">
                            <Eye className="h-4 w-4 text-[#1f2533]" />
                            Repartition des Activites
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="h-[260px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={activityData}
                                        cx="50%"
                                        cy="52%"
                                        innerRadius={52}
                                        outerRadius={88}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {activityData.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-[#1f2533]">
                            <LegendDot color="#111111" label="CV analyses" />
                            <LegendDot color="#2f80ed" label="Entretiens" />
                            <LegendDot color="#34a853" label="Matchings" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[33px] font-semibold text-[#242a38]">Activite Mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyActivity} margin={{ top: 10, right: 10, left: 2, bottom: 0 }}>
                                    <CartesianGrid stroke="#eceff5" strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fill: "#72809a", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        tick={{ fill: "#72809a", fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 15000, 30000, 45000, 60000]}
                                        domain={[0, 60000]}
                                    />
                                    <Tooltip />
                                    <Bar dataKey="cv" fill="#23b27e" maxBarSize={26} radius={[0, 0, 0, 0]} />
                                    <Bar dataKey="entretiens" fill="#f39c12" maxBarSize={26} radius={[0, 0, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[33px] font-semibold text-[#242a38]">Repartition des Utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="relative h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={userDistribution} cx="50%" cy="55%" outerRadius={68} dataKey="value" stroke="none">
                                        {userDistribution.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <p className="absolute left-[20%] top-[12%] text-[11px] text-[#3f7fe8]">Etudiants: 65%</p>
                            <p className="absolute left-[56%] top-[43%] text-[11px] text-[#7b61ff]">Diplomes 10%</p>
                            <p className="absolute left-[44%] top-[62%] text-[11px] text-[#27ae60]">Professionnels: 25%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

type KpiCardProps = {
    title: string
    value: string
    icon: React.ComponentType<{ className?: string }>
}

function KpiCard({ title, value, icon: Icon }: KpiCardProps) {
    return (
        <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
            <CardContent className="flex items-start justify-between px-4 py-4">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{title}</p>
                    <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                </div>
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a89ef]">
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardContent>
        </Card>
    )
}

type LegendDotProps = {
    color: string
    label: string
}

function LegendDot({ color, label }: LegendDotProps) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5" style={{ backgroundColor: color }} />
            <span>{label}</span>
        </div>
    )
}

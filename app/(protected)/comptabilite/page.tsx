"use client"

import {
    Line,
    LineChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {
    DollarSign,
    Users,
    UserPlus,
    AlertTriangle,
    MoreHorizontal,
    Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const revenueData = [
    { month: "Jan", value: 34000 },
    { month: "Fev", value: 42000 },
    { month: "Mar", value: 38500 },
    { month: "Avr", value: 45500 },
    { month: "Mai", value: 48200 },
    { month: "Juin", value: 52230 },
]

const subscriptionsData = [
    { month: "Jan", value: 1140 },
    { month: "Fev", value: 1200 },
    { month: "Mar", value: 1180 },
    { month: "Avr", value: 1240 },
    { month: "Mai", value: 1300 },
    { month: "Juin", value: 1350 },
]

const subscriptionsRows = [
    {
        initials: "MD",
        name: "Marie Dubois",
        email: "marie.dubois@email.com",
        type: "Candidat",
        typeClass: "bg-[#dbe8ff] text-[#4a7de8]",
        plan: "Standard",
        status: "Actif",
        statusClass: "bg-[#e1f8e8] text-[#33b06b]",
        amount: "€19.99",
        nextBilling: "15/03/2024",
    },
    {
        initials: "TS",
        name: "TechCorp SARL",
        email: "contact@techcorp.fr",
        type: "Entreprise",
        typeClass: "bg-[#def8e8] text-[#2daa68]",
        plan: "Business+",
        status: "Expire bientot",
        statusClass: "bg-[#fff1df] text-[#ff8a2b]",
        amount: "€351.90",
        nextBilling: "02/03/2024",
    },
    {
        initials: "JM",
        name: "Jean Martin",
        email: "jean.martin@formation.fr",
        type: "Formateur",
        typeClass: "bg-[#efe1ff] text-[#a05eff]",
        plan: "Premium",
        status: "Essai",
        statusClass: "bg-[#fff5d9] text-[#f3a62a]",
        amount: "€49.99",
        nextBilling: "28/02/2024",
    },
    {
        initials: "SL",
        name: "Sophie Laurent",
        email: "s.laurent@email.com",
        type: "Candidat",
        typeClass: "bg-[#dbe8ff] text-[#4a7de8]",
        plan: "Standard",
        status: "Expire",
        statusClass: "bg-[#ffe1e1] text-[#ff6b6b]",
        amount: "€19.99",
        nextBilling: "20/02/2024",
    },
    {
        initials: "I",
        name: "InnovSoft",
        email: "admin@innovsoft.com",
        type: "Entreprise",
        typeClass: "bg-[#def8e8] text-[#2daa68]",
        plan: "Business",
        status: "Actif",
        statusClass: "bg-[#e1f8e8] text-[#33b06b]",
        amount: "€35.50",
        nextBilling: "10/03/2024",
    },
]

export default function Page() {
    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Comptabilite</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">Gestion des abonnements et facturation des utilisateurs</p>
                </div>

                <Button className="mt-1 h-9 rounded-full bg-[#0f56d9] px-6 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                    Exporter
                    <Download className="h-3.5 w-3.5" />
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    title="Revenus mensuels"
                    value="€48 230"
                    note="+12% vs mois dernier"
                    noteClass="text-[#23b26f]"
                    icon={DollarSign}
                />
                <KpiCard
                    title="Abonnements actifs"
                    value="1 247"
                    note="+5% ce mois"
                    noteClass="text-[#23b26f]"
                    icon={Users}
                />
                <KpiCard
                    title="Essais en cours"
                    value="89"
                    note="+23% cette semaine"
                    noteClass="text-[#23b26f]"
                    icon={UserPlus}
                />
                <KpiCard
                    title="Expirations imminentes"
                    value="34"
                    note="Prochains 7 jours"
                    noteClass="text-[#99a1b4]"
                    icon={AlertTriangle}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[21px] font-semibold text-[#242a38]">Évolution des revenus</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="h-[170px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData} margin={{ top: 8, right: 6, left: 4, bottom: 0 }}>
                                    <CartesianGrid stroke="#e8ebf2" strokeDasharray="3 3" vertical />
                                    <XAxis dataKey="month" tick={{ fill: "#7f8797", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        tick={{ fill: "#7f8797", fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 15000, 30000, 45000, 60000]}
                                        tickFormatter={(value) => `€${value.toLocaleString()}`}
                                        domain={[0, 60000]}
                                    />
                                    <Tooltip formatter={(value: number) => [`€${value.toLocaleString()}`, "Revenus"]} />
                                    <Line type="monotone" dataKey="value" stroke="#2b78f6" strokeWidth={2.4} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[21px] font-semibold text-[#242a38]">Nombre d'abonnements</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-5">
                        <div className="h-[170px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={subscriptionsData} margin={{ top: 8, right: 6, left: 4, bottom: 0 }}>
                                    <CartesianGrid stroke="#e8ebf2" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: "#7f8797", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis
                                        tick={{ fill: "#7f8797", fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                        ticks={[0, 350, 700, 1050, 1400]}
                                        domain={[0, 1400]}
                                    />
                                    <Tooltip formatter={(value: number) => [value, "Abonnements"]} />
                                    <Bar dataKey="value" fill="#3b7ddd" radius={[2, 2, 0, 0]} maxBarSize={56} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-full bg-[#eef3fb] p-1">
                <div className="grid grid-cols-5 gap-1 text-center text-[10px] text-[#7e8799]">
                    <div className="rounded-full bg-[#2f80ed] px-3 py-1.5 text-white">Tous <span className="ml-1 rounded-full bg-white px-1.5 py-0.5 text-[#2f80ed]">1247</span></div>
                    <div className="px-3 py-1.5">Actifs <span className="ml-1 text-[#4d5567]">856</span></div>
                    <div className="px-3 py-1.5">Essais <span className="ml-1 text-[#4d5567]">89</span></div>
                    <div className="px-3 py-1.5">Expirent <span className="ml-1 text-[#4d5567]">34</span></div>
                    <div className="px-3 py-1.5">Expirés <span className="ml-1 text-[#4d5567]">268</span></div>
                </div>
            </div>

            <div>
                <h2 className="text-[24px] font-semibold text-[#242a38]">Gestion des abonnements</h2>
                <p className="mt-1 text-[12px] text-[#8a92a3]">Vue d'ensemble de tous les utilisateurs et leur statut d'abonnement</p>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-0 pb-0 pt-2">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-[#e3e7f0] hover:bg-transparent">
                                <TableHead className="px-4 text-[11px] font-medium text-[#9aa2b2]">Utilisateur</TableHead>
                                <TableHead className="text-[11px] font-medium text-[#9aa2b2]">Type</TableHead>
                                <TableHead className="text-[11px] font-medium text-[#9aa2b2]">Plan</TableHead>
                                <TableHead className="text-[11px] font-medium text-[#9aa2b2]">Statut</TableHead>
                                <TableHead className="text-[11px] font-medium text-[#9aa2b2]">Montant</TableHead>
                                <TableHead className="text-[11px] font-medium text-[#9aa2b2]">Prochaine facturation</TableHead>
                                <TableHead className="w-10 px-4" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptionsRows.map((row) => (
                                <TableRow key={`${row.name}-${row.email}`} className="border-b border-[#e9edf5] hover:bg-[#fbfcff]">
                                    <TableCell className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf4ff] text-[10px] font-medium text-[#5a8df1]">
                                                {row.initials}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#2d3443]">{row.name}</p>
                                                <p className="text-[11px] text-[#8e96a8]">{row.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-[11px] text-[#2d3443]">
                                        <span className={`rounded-full px-2 py-0.5 ${row.typeClass}`}>{row.type}</span>
                                    </TableCell>
                                    <TableCell className="py-3 text-[12px] text-[#4a5162]">{row.plan}</TableCell>
                                    <TableCell className="py-3 text-[11px]">
                                        <span className={`rounded-full px-2 py-0.5 ${row.statusClass}`}>{row.status}</span>
                                    </TableCell>
                                    <TableCell className="py-3 text-[12px] text-[#4a5162]">{row.amount}</TableCell>
                                    <TableCell className="py-3 text-[12px] text-[#7d8698]">{row.nextBilling}</TableCell>
                                    <TableCell className="px-4 py-3 text-right text-[#3d4455]">
                                        <MoreHorizontal className="ml-auto h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

type KpiCardProps = {
    title: string
    value: string
    note: string
    noteClass: string
    icon: React.ComponentType<{ className?: string }>
}

function KpiCard({ title, value, note, noteClass, icon: Icon }: KpiCardProps) {
    return (
        <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
            <CardContent className="flex items-start justify-between px-4 py-3.5">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{title}</p>
                    <p className="mt-2 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                    <p className={`mt-1 text-[10px] ${noteClass}`}>{note}</p>
                </div>
                <Icon className="mt-1 h-4 w-4 text-[#697286]" />
            </CardContent>
        </Card>
    )
}
"use client"

import { useMemo, useState } from "react"
import {
    Clock3,
    FileText,
    Filter,
    Eye,
    MessageSquare,
    Plus,
    Search,
    Sparkles,
    TrendingUp,
    Users,
    Download,
    CheckCircle2,
    Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const metrics = [
    {
        title: "1,247",
        subtitle: "Total candidatures",
        context: "Ce mois",
        growth: "+12%",
        icon: FileText,
        iconClass: "bg-[#edf3ff] text-[#3f7fe8]",
        growthClass: "bg-[#dff7e9] text-[#23b26f]",
    },
    {
        title: "89",
        subtitle: "En attente",
        context: "À traiter",
        growth: "+5%",
        icon: Clock3,
        iconClass: "bg-[#f4f5f8] text-[#4a5162]",
        growthClass: "bg-[#fff3dd] text-[#f0a04b]",
    },
    {
        title: "156",
        subtitle: "En cours d'examen",
        context: "En processus",
        growth: "+18%",
        icon: Users,
        iconClass: "bg-[#edf3ff] text-[#3f7fe8]",
        growthClass: "bg-[#dff7e9] text-[#23b26f]",
    },
    {
        title: "342",
        subtitle: "Approuvées",
        context: "Validées",
        growth: "+22%",
        icon: CheckCircle2,
        iconClass: "bg-[#edf3ff] text-[#3f7fe8]",
        growthClass: "bg-[#dff7e9] text-[#23b26f]",
    },
    {
        title: "78%",
        subtitle: "Score IA moyen",
        context: "Compatibilité",
        growth: "+3%",
        icon: Brain,
        iconClass: "bg-[#edf3ff] text-[#3f7fe8]",
        growthClass: "bg-[#dff7e9] text-[#23b26f]",
    },
    {
        title: "24.5%",
        subtitle: "Taux de conversion",
        context: "Recrutement",
        growth: "+7%",
        icon: TrendingUp,
        iconClass: "bg-[#edf3ff] text-[#3f7fe8]",
        growthClass: "bg-[#dff7e9] text-[#23b26f]",
    },
]

const candidates = [
    {
        id: "1",
        initials: "MD",
        name: "Marie Dubois",
        email: "marie.dubois@email.com",
        role: "Développeur Frontend React",
        company: "TechCorp",
        receivedDate: "15/12/2024",
        score: 85,
        status: "En cours d'examen",
        statusClass: "bg-[#e7f0ff] text-[#2f80ed] border-[#2f80ed]",
    },
    {
        id: "2",
        initials: "PM",
        name: "Pierre Martin",
        email: "pierre.martin@email.com",
        role: "Data Scientist Senior",
        company: "DataFlow",
        receivedDate: "14/12/2024",
        score: 92,
        status: "En attente",
        statusClass: "bg-[#fff3dd] text-[#cb8b25] border-[#cb8b25]",
    },
    {
        id: "3",
        initials: "SB",
        name: "Sophie Bernard",
        email: "sophie.bernard@email.com",
        role: "UX/UI Designer",
        company: "DesignStudio",
        receivedDate: "13/12/2024",
        score: 88,
        status: "Approuvé",
        statusClass: "bg-[#dff7e9] text-[#23b26f] border-[#23b26f]",
    },
    {
        id: "4",
        initials: "LR",
        name: "Lucas Rousseau",
        email: "lucas.rousseau@email.com",
        role: "DevOps Engineer",
        company: "CloudTech",
        receivedDate: "12/12/2024",
        score: 65,
        status: "Rejetée",
        statusClass: "bg-[#ffe7e7] text-[#e84b4b] border-[#e84b4b]",
    },
]

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [status, setStatus] = useState("all")

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        return candidates.filter((candidate) => {
            const inSearch =
                !term ||
                [candidate.name, candidate.email, candidate.role, candidate.company]
                    .join(" ")
                    .toLowerCase()
                    .includes(term)

            const inStatus = status === "all" || candidate.status.toLowerCase().includes(status)
            return inSearch && inStatus
        })
    }, [searchTerm, status])

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Candidatures</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {metrics.map((metric) => (
                    <Card key={metric.subtitle} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="px-4 py-4">
                            <div className="mb-4 flex items-center justify-between">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.iconClass}`}>
                                    <metric.icon className="h-4 w-4" />
                                </div>
                                <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${metric.growthClass}`}>
                                    {metric.growth}
                                </Badge>
                            </div>
                            <p className="text-[37px] font-semibold leading-none text-[#232a38]">{metric.title}</p>
                            <p className="mt-2 text-[14px] font-medium text-[#2f3647]">{metric.subtitle}</p>
                            <p className="text-[12px] text-[#8a92a3]">{metric.context}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f96a7]" />
                            <Input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Rechercher un candidat..."
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] pl-9 text-[12px] text-[#313847] shadow-none"
                            />
                        </div>

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="h-10 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] lg:w-[130px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Statut</SelectItem>
                                <SelectItem value="en cours">En cours</SelectItem>
                                <SelectItem value="attente">En attente</SelectItem>
                                <SelectItem value="approuvé">Approuvé</SelectItem>
                                <SelectItem value="rejetée">Rejetée</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                            <Filter className="h-3.5 w-3.5" />
                            Filtres
                        </Button>
                        <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                            <Download className="h-3.5 w-3.5" />
                            Exporter
                        </Button>
                        <Button className="h-10 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                            <Plus className="h-3.5 w-3.5" />
                            Nouvelle candidature
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {filtered.map((candidate) => (
                    <Card key={candidate.id} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="px-4 py-4">
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f7af5] text-[11px] font-semibold text-white">
                                        {candidate.initials}
                                    </div>
                                    <div>
                                        <p className="text-[33px] font-semibold leading-none text-[#232a38]">{candidate.name}</p>
                                        <p className="text-[12px] text-[#7f8797]">{candidate.email}</p>
                                    </div>
                                </div>
                                <Badge className={`rounded-full border px-2 py-0.5 text-[10px] ${candidate.statusClass}`}>
                                    {candidate.status}
                                </Badge>
                            </div>

                            <p className="text-[17px] font-medium text-[#2c3343]">{candidate.role}</p>
                            <p className="text-[14px] text-[#7f8797]">{candidate.company}</p>

                            <div className="mt-3 flex items-center justify-between text-[12px]">
                                <p className="text-[#7f8797]">Candidature reçue le {candidate.receivedDate}</p>
                                <p className="text-[#7f8797]">
                                    Score IA:
                                    <span className="ml-2 rounded-full bg-[#e7f0ff] px-2 py-0.5 text-[10px] font-medium text-[#2f80ed]">
                                        {candidate.score}%
                                    </span>
                                </p>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <Button variant="outline" className="h-8 flex-1 rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                    <Eye className="h-3.5 w-3.5" />
                                    Voir le profil
                                </Button>
                                <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                    CV
                                </Button>
                                <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    Contact
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button className="hidden" variant="ghost">
                <Sparkles className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}

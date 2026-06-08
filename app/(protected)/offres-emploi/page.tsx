"use client"

import { useMemo, useState } from "react"
import {
    Briefcase,
    Calendar,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    Users,
    TrendingUp,
    Building2,
    CircleAlert,
    Workflow,
    Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddJobModal } from "@/components/modals/add-job-modal"

const jobRows = [
    {
        id: "1",
        title: "Développeur React Senior",
        company: "TechCorp Solutions",
        location: "Paris, France",
        contract: "CDI",
        salary: "55k - 70k €",
        candidates: 42,
        date: "2024-03-10",
        status: "Active",
        statusClass: "bg-[#24bf7e] text-white",
    },
    {
        id: "2",
        title: "Chef de Projet Marketing Digital",
        company: "Digital Marketing Pro",
        location: "Lyon, France",
        contract: "CDI",
        salary: "45k - 55k €",
        candidates: 38,
        date: "2024-03-12",
        status: "Active",
        statusClass: "bg-[#24bf7e] text-white",
    },
    {
        id: "3",
        title: "Ingénieur DevOps",
        company: "Green Energy Corp",
        location: "Toulouse, France",
        contract: "CDI",
        salary: "50k - 65k €",
        candidates: 29,
        date: "2024-03-08",
        status: "Urgent",
        statusClass: "bg-[#ff5a5a] text-white",
    },
]

const sectorStats = [
    { label: "Technologie", value: "2,847", barClass: "bg-[#6366f1]", widthClass: "w-[74px]" },
    { label: "Marketing", value: "1,923", barClass: "bg-[#6366f1]", widthClass: "w-[46px]" },
    { label: "Finance", value: "1,456", barClass: "bg-[#27c48f]", widthClass: "w-[40px]" },
    { label: "Design", value: "987", barClass: "bg-[#ef9435]", widthClass: "w-[26px]" },
]

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const filteredJobs = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase()
        if (!normalized) {
            return jobRows
        }

        return jobRows.filter((job) =>
            [job.title, job.company, job.location].some((value) => value.toLowerCase().includes(normalized)),
        )
    }, [searchTerm])

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Offres d'Emploi</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">Gérez toutes les annonces d'emploi sur la plateforme</p>
                </div>

                <Button
                    className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="h-3.5 w-3.5" />
                    Nouvelle Offre
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    title="Offres Actives"
                    value="8,456"
                    subtitle="Annonces publiées"
                    note="+5% par rapport au mois dernier"
                    borderClass="border-[#f0b475]"
                    iconClass="bg-[#ee9b3b]"
                    icon={Briefcase}
                />
                <KpiCard
                    title="Candidatures Totales"
                    value="34,567"
                    subtitle="Ce mois"
                    note="+18% par rapport au mois dernier"
                    borderClass="border-[#a777ff]"
                    iconClass="bg-[#8550e9]"
                    icon={Users}
                />
                <KpiCard
                    title="Taux de Match IA"
                    value="87%"
                    subtitle="Correspondances réussies"
                    note="+12% par rapport au mois dernier"
                    borderClass="border-[#55d5ac]"
                    iconClass="bg-[#2db77f]"
                    icon={TrendingUp}
                />
                <KpiCard
                    title="Nouvelles Entreprises"
                    value="127"
                    subtitle="Recruteurs ce mois"
                    note="+8% par rapport au mois dernier"
                    borderClass="border-[#d9dce6]"
                    iconClass="bg-[#4a89ef]"
                    icon={Building2}
                />
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f96a7]" />
                            <Input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Rechercher par titre, entreprise, localisation..."
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] pl-9 text-[12px] text-[#313847] shadow-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                <Filter className="h-3.5 w-3.5" />
                                Type de contrat
                            </Button>
                            <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                <MapPin className="h-3.5 w-3.5" />
                                Localisation
                            </Button>
                            <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                <Calendar className="h-3.5 w-3.5" />
                                Date de publication
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[24px] font-semibold text-[#242a38]">Liste des Offres d'Emploi</h2>

                    <div className="space-y-3">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex flex-col gap-3 rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3 lg:flex-row lg:items-center lg:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-white">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-medium text-[#252c3b]">{job.title}</p>
                                        <p className="text-[11px] text-[#7f8797]">{job.company}</p>
                                        <div className="mt-1 flex items-center gap-2 text-[10px] text-[#8a92a3]">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {job.location}
                                            </span>
                                            <Badge className="rounded-full border-0 bg-[#f1f3f7] px-2 py-0.5 text-[10px] text-[#202737]">
                                                {job.contract}
                                            </Badge>
                                            <span className="text-[#24b36f]">{job.salary}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <div className="text-right">
                                        <p className="text-[13px] font-semibold text-[#2b78f6]">{job.candidates}</p>
                                        <p className="text-[10px] text-[#8a92a3]">Candidatures</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] text-[#4a5162]">{job.date}</p>
                                        <p className="text-[10px] text-[#8a92a3]">Publié le</p>
                                    </div>
                                    <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${job.statusClass}`}>
                                        {job.status}
                                    </Badge>
                                    <Button variant="outline" className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                        <Eye className="h-3.5 w-3.5" />
                                        Voir Détails
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 text-[24px] font-semibold text-[#242a38]">Statistiques par Secteur</h2>
                        <div className="space-y-3">
                            {sectorStats.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-4">
                                    <span className="w-28 text-[12px] text-[#2a3140]">{item.label}</span>
                                    <div className="flex flex-1 items-center justify-end gap-3">
                                        <div className={`h-1.5 rounded-full ${item.barClass} ${item.widthClass}`} />
                                        <span className="w-10 text-right text-[11px] text-[#6c7588]">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 text-[24px] font-semibold text-[#242a38]">Actions de Gestion</h2>
                        <div className="space-y-2">
                            {[
                                "Créer une Nouvelle Offre",
                                "Offres Expirantes (23)",
                                "Rapport de Performance",
                                "Gérer les Candidatures",
                            ].map((label) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    className="h-9 w-full justify-start rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[12px] text-[#41495a] hover:bg-[#f1f4fa]"
                                >
                                    <Workflow className="h-3.5 w-3.5" />
                                    {label}
                                </Button>
                            ))}
                            <Button className="h-9 w-full justify-start rounded-lg border border-[#2f80ed] bg-white px-3 text-[12px] text-[#2f80ed] hover:bg-[#eef5ff]">
                                <Sparkles className="h-3.5 w-3.5" />
                                Matching IA Automatique
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#f6d7b8] bg-[#fff9f2] py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <div className="flex items-start gap-2">
                        <CircleAlert className="mt-0.5 h-4 w-4 text-[#f0a04b]" />
                        <div>
                            <p className="text-[13px] font-semibold text-[#f0a04b]">Offres Urgentes</p>
                            <p className="mt-1 text-[11px] text-[#8a7b69]">
                                23 offres d'emploi expirent dans les 7 prochains jours. Contactez les entreprises pour renouveler ou prolonger.
                            </p>
                            <Button variant="outline" className="mt-2 h-7 rounded-full border-[#f0c28e] bg-white px-3 text-[10px] text-[#cb7b1b] hover:bg-[#fff5e8]">
                                Voir les Offres Expirantes
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AddJobModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={() => setIsAddModalOpen(false)} />
        </div>
    )
}

type KpiCardProps = {
    title: string
    value: string
    subtitle: string
    note: string
    borderClass: string
    iconClass: string
    icon: React.ComponentType<{ className?: string }>
}

function KpiCard({ title, value, subtitle, note, borderClass, iconClass, icon: Icon }: KpiCardProps) {
    return (
        <Card className={`rounded-[10px] border bg-white py-0 shadow-none ${borderClass}`}>
            <CardContent className="flex items-start justify-between px-4 py-4">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{title}</p>
                    <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                    <p className="mt-1 text-[10px] text-[#8b92a3]">{subtitle}</p>
                    <p className="mt-1 text-[10px] text-[#23b26f]">{note}</p>
                </div>
                <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardContent>
        </Card>
    )
}

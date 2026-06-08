"use client"

import { useMemo, useState } from "react"
import {
    Award,
    Calendar,
    Eye,
    Filter,
    Plus,
    Search,
    Sparkles,
    TrendingUp,
    UserPlus,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddStudentModal } from "@/components/modals/add-student-modal"
import { exportToCSV } from "@/lib/export-utils"
import { mockStudents } from "@/lib/mock-data"
import type { IUser } from "@/lib/@types/entities"

const candidateRows = [
    {
        id: "1",
        initials: "MD",
        name: "Marie Dubois",
        email: "marie.dubois@email.com",
        specialty: "Marketing Digital",
        city: "Abidjan, Cocody",
        score: 87,
        plan: "Starter",
        planClass: "bg-[#edf0f6] text-[#3d4354]",
        date: "2024-01-15",
        joinedText: "Inscrit le",
    },
    {
        id: "2",
        initials: "JM",
        name: "Jean Martin",
        email: "jean.martin@email.com",
        specialty: "Développement Web",
        city: "Abidjan, Cocody",
        score: 94,
        plan: "Premium",
        planClass: "bg-[#24bf7e] text-white",
        date: "2024-02-03",
        joinedText: "Inscrit le",
    },
    {
        id: "3",
        initials: "SL",
        name: "Sophie Laurent",
        email: "sophie.laurent@email.com",
        specialty: "Data Science",
        city: "Abidjan, Cocody",
        score: 91,
        plan: "Starter",
        planClass: "bg-[#edf0f6] text-[#3d4354]",
        date: "2024-01-28",
        joinedText: "Inscrit le",
    },
]

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [students, setStudents] = useState<IUser[]>(mockStudents)

    const filteredRows = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase()
        if (!normalized) {
            return candidateRows
        }

        return candidateRows.filter((candidate) =>
            [candidate.name, candidate.email, candidate.specialty, candidate.city].some((value) =>
                value.toLowerCase().includes(normalized),
            ),
        )
    }, [searchTerm])

    const handleAddStudent = (studentData: any) => {
        const newStudent = {
            ...studentData,
            id: Date.now().toString(),
            matchingScore: Math.floor(Math.random() * 30) + 70,
            status: "active",
            joinDate: new Date().toISOString().split("T")[0],
            avatar: "/placeholder.svg",
            skills: studentData.skills.split(",").map((skill: string) => skill.trim()),
        }
        setStudents((prev) => [newStudent, ...prev])
    }

    const averageScore = Math.round(students.reduce((sum, student) => sum + student.matchingScore, 0) / students.length)
    const premiumCount = Math.max(3247, students.filter((student) => student.status === "premium").length)

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Étudiants/Candidats</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">Gérez les profils des candidats sur la plateforme</p>
                </div>

                <Button
                    className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="h-3.5 w-3.5" />
                    Nouveau Candidat
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    title="Total Candidats"
                    value="12,847"
                    note="+12% par rapport au mois dernier"
                    noteClass="text-[#23b26f]"
                    icon={Users}
                    borderClass="border-[#d9dce6]"
                    iconBoxClass="bg-[#4a89ef]"
                />
                <KpiCard
                    title="Profils Premium"
                    value={premiumCount.toLocaleString()}
                    note="+8% par rapport au mois dernier"
                    noteClass="text-[#23b26f]"
                    icon={Award}
                    borderClass="border-[#55d5ac]"
                    iconBoxClass="bg-[#2db77f]"
                />
                <KpiCard
                    title="CV Score Moyen"
                    value={`${Math.max(86, averageScore)}%`}
                    note="+3% par rapport au mois dernier"
                    noteClass="text-[#23b26f]"
                    icon={Sparkles}
                    borderClass="border-[#a777ff]"
                    iconBoxClass="bg-[#8550e9]"
                />
                <KpiCard
                    title="Nouveaux ce mois"
                    value="2,847"
                    note="+15% par rapport au mois dernier"
                    noteClass="text-[#23b26f]"
                    icon={TrendingUp}
                    borderClass="border-[#f0b475]"
                    iconBoxClass="bg-[#ee9b3b]"
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
                                placeholder="Rechercher par nom, email, domaine..."
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] pl-9 text-[12px] text-[#313847] shadow-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                <Filter className="h-3.5 w-3.5" />
                                Filtrer
                            </Button>
                            <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                <Calendar className="h-3.5 w-3.5" />
                                Date
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[24px] font-semibold text-[#242a38]">Liste des Candidats</h2>

                    <div className="space-y-3">
                        {filteredRows.map((candidate) => (
                            <div
                                key={candidate.id}
                                className="flex flex-col gap-3 rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3 lg:flex-row lg:items-center lg:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[12px] font-semibold text-white">
                                        {candidate.initials}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-medium text-[#252c3b]">{candidate.name}</p>
                                        <p className="text-[11px] text-[#7f8797]">{candidate.email}</p>
                                        <div className="mt-1 flex items-center gap-2 text-[10px] text-[#8a92a3]">
                                            <Badge className="rounded-full border-0 bg-[#f1f3f7] px-2 py-0.5 text-[10px] font-medium text-[#202737]">
                                                {candidate.specialty}
                                            </Badge>
                                            <span>{candidate.city}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <div className="text-right">
                                        <p className="text-[13px] font-semibold text-[#2b78f6]">{candidate.score}%</p>
                                        <p className="text-[10px] text-[#8a92a3]">Score CV</p>
                                    </div>

                                    <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${candidate.planClass}`}>
                                        {candidate.plan}
                                    </Badge>

                                    <div className="text-right">
                                        <p className="text-[11px] text-[#4a5162]">{candidate.date}</p>
                                        <p className="text-[10px] text-[#8a92a3]">{candidate.joinedText}</p>
                                    </div>

                                    <Button variant="outline" className="h-8 rounded-lg border-[#ebedf4] bg-[#f8f9fc] px-3 text-[11px] text-[#3f4657] hover:bg-[#f1f4fa]">
                                        <Eye className="h-3.5 w-3.5" />
                                        Voir Profil
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-[12px] text-[#8a92a3]">Sélectionnez des candidats pour des actions en lot</p>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                        <Button
                            variant="outline"
                            className="h-9 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567] hover:bg-[#f1f4fa]"
                            onClick={() => exportToCSV(filteredRows, "candidats")}
                        >
                            Exporter CSV
                        </Button>
                        <Button variant="outline" className="h-9 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567] hover:bg-[#f1f4fa]">
                            Envoyer Message
                        </Button>
                        <Button className="h-9 rounded-lg border border-[#2f80ed] bg-white px-3 text-[11px] text-[#2f80ed] hover:bg-[#eef5ff]">
                            <Sparkles className="h-3.5 w-3.5" />
                            Analyse Goriya
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddStudent} />
        </div>
    )
}

type KpiCardProps = {
    title: string
    value: string
    note: string
    noteClass: string
    icon: React.ComponentType<{ className?: string }>
    borderClass: string
    iconBoxClass: string
}

function KpiCard({ title, value, note, noteClass, icon: Icon, borderClass, iconBoxClass }: KpiCardProps) {
    return (
        <Card className={`rounded-[10px] border bg-white py-0 shadow-none ${borderClass}`}>
            <CardContent className="flex items-start justify-between px-4 py-4">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{title}</p>
                    <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                    <p className={`mt-2 text-[10px] ${noteClass}`}>{note}</p>
                </div>
                <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-lg ${iconBoxClass}`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardContent>
        </Card>
    )
}

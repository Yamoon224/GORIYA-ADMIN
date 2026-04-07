"use client"

import { useEffect, useState } from "react"
import { Users, Award, TrendingUp, UserPlus, Filter, Download, MoreHorizontal, Search } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { IUser } from "@/lib/@types/entities"
import { AddStudentModal } from "@/components/modals/add-student-modal"
import { exportToCSV, exportToJSON, exportToPDF } from "@/lib/export-utils"
import { mockStudents } from "@/lib/mock-data"

export default function Page() {
    const [students, setStudents] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [filteredStudents, setFilteredStudents] = useState<IUser[]>([])

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setStudents(mockStudents)
                setFilteredStudents(mockStudents)
            } catch (error) {
                console.error("Error fetching students:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [])

    useEffect(() => {
        const filtered = students.filter(
            (student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.skills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredStudents(filtered)
    }, [searchTerm, students])

    const handleExportCSV = () => {
        exportToCSV(filteredStudents, "candidats")
    }

    const handleExportJSON = () => {
        exportToJSON(filteredStudents, "candidats")
    }

    const handleExportPDF = () => {
        exportToPDF(filteredStudents, "candidats", "Liste des Candidats")
    }

    const handleAddStudent = (studentData: any) => {
        const newStudent = {
            ...studentData,
            id: Date.now().toString(),
            matchingScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
            status: "active",
            joinDate: new Date().toISOString().split("T")[0],
            avatar: "/placeholder.svg",
            skills: studentData.skills.split(",").map((s: string) => s.trim()),
        }
        setStudents((prev) => [newStudent, ...prev])
    }

    return (
        <div className="p-4 lg:p-4 space-y-2">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Étudiants/Candidats</h1>
                    <p className="text-gray-600">Gérez vos profils des candidats sur la plateforme</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto" onClick={() => setIsAddModalOpen(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Nouveau Candidat
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatsCard
                    title="Total Candidats"
                    value={students.length.toLocaleString()}
                    subtitle="Total des candidats sur la plateforme"
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Profils Premium"
                    value={students.filter((s) => s.status === "premium").length.toString()}
                    subtitle="Candidats avec profil premium"
                    icon={Award}
                    color="bg-green-500"
                />
                <StatsCard
                    title="CV Score Moyen"
                    value={`${Math.round(students.reduce((acc, s) => acc + s.matchingScore, 0) / students.length)}%`}
                    subtitle="Score moyen de matching"
                    icon={TrendingUp}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Nouveaux ce mois"
                    value={students.filter((s) => new Date(s.joinDate).getMonth() === new Date().getMonth()).length.toString()}
                    subtitle="Nouveaux candidats ce mois"
                    icon={UserPlus}
                    color="bg-orange-500"
                />
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Rechercher par nom, email, domaine, compétences..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 lg:flex-none bg-transparent">
                                <Filter className="w-4 h-4 mr-2" />
                                Filtrer
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex-1 lg:flex-none bg-transparent">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={handleExportCSV}>Exporter CSV</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleExportJSON}>Exporter JSON</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleExportPDF}>Exporter PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {searchTerm && (
                        <div className="mt-2 text-sm text-gray-500">
                            {filteredStudents.length} résultat{filteredStudents.length !== 1 ? "s" : ""} trouvé
                            {filteredStudents.length !== 1 ? "s" : ""}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Students List */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Candidats ({filteredStudents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-sm gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="bg-blue-500 text-white">
                                            {student.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{student.name}</h3>
                                        <p className="text-sm text-gray-600">{student.email}</p>
                                        <p className="text-sm text-gray-500">{student.field}</p>
                                        {student.skills && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {student.skills.slice(0, 3).map((skill, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {student.skills.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{student.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-between lg:justify-end">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">{student.matchingScore}%</div>
                                        <div className="text-xs text-gray-500">Score CV</div>
                                    </div>

                                    <Badge
                                        variant={student.status === "premium" ? "default" : "secondary"}
                                        className={student.status === "premium" ? "bg-green-500" : ""}
                                    >
                                        {student.status === "premium" ? "Premium" : "Actif"}
                                    </Badge>

                                    <div className="text-sm text-gray-500 hidden lg:block">
                                        {new Date(student.joinDate).toLocaleDateString("fr-FR")}
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Voir Profil</DropdownMenuItem>
                                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                                            <DropdownMenuItem>Envoyer Message</DropdownMenuItem>
                                            <DropdownMenuItem>Analyser CV</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm ? "Aucun candidat trouvé pour cette recherche" : "Aucun candidat disponible"}
                        </div>
                    )}
                </CardContent>
            </Card>

            <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddStudent} />
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, Eye, Users, TrendingUp, Filter, Search, MoreHorizontal } from "lucide-react"
import { candidatureService } from "@/lib/services/candidature.service"
import type { ICandidature } from "@/lib/@types/entities"

export default function Page() {
    const [stats, setStats] = useState({
        totalCandidatures: 1247,
        enAttente: 89,
        enCoursExamen: 156,
        approuvees: 342,
        scoreMoyen: 78,
        tauxConversion: 24.5,
    })
    const [candidatures, setCandidatures] = useState<ICandidature[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    useEffect(() => {
        loadData()
    }, [statusFilter])

    const loadData = async () => {
        try {
            setLoading(true)
            const [statsData, candidaturesData] = await Promise.all([
                candidatureService.getStats(),
                candidatureService.getCandidatures({ page: 1, limit: 10, status: statusFilter === "all" ? undefined : statusFilter as any }),
            ])
            setStats(statsData)
            setCandidatures(candidaturesData.candidatures || [])
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
            // Mock data for demo
            setCandidatures([
                {
                    id: "1",
                    candidateName: "Marie Dubois",
                    candidateEmail: "marie.dubois@email.com",
                    position: "Développeur Frontend React",
                    company: "TechCorp",
                    status: "en_attente",
                    score: 88,
                    appliedDate: "2024-01-15",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "2",
                    candidateName: "Pierre Martin",
                    candidateEmail: "pierre.martin@email.com",
                    position: "Data Scientist Senior",
                    company: "DataTech",
                    status: "approuvee",
                    score: 92,
                    appliedDate: "2024-01-14",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "3",
                    candidateName: "Sophie Bernard",
                    candidateEmail: "sophie.bernard@email.com",
                    position: "UX/UI Designer",
                    company: "DesignStudio",
                    status: "en_cours",
                    score: 85,
                    appliedDate: "2024-01-13",
                    avatar: "/placeholder-user.jpg",
                },
                {
                    id: "4",
                    candidateName: "Lucas Rousseau",
                    candidateEmail: "lucas.rousseau@email.com",
                    position: "DevOps Engineer",
                    company: "CloudTech",
                    status: "rejetee",
                    score: 68,
                    appliedDate: "2024-01-12",
                    avatar: "/placeholder-user.jpg",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            en_attente: { label: "En attente", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
            en_cours: { label: "En cours", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
            approuvee: { label: "Approuvée", variant: "default" as const, color: "bg-green-100 text-green-800" },
            rejetee: { label: "Rejetée", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.en_attente
        return <Badge className={config.color}>{config.label}</Badge>
    }

    const handleStatusChange = async (candidatureId: string, newStatus: string) => {
        try {
            await candidatureService.updateCandidatureStatus(candidatureId, newStatus as any)
            await loadData()
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error)
        }
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Candidatures</h1>
                    <p className="text-gray-600">Gérez les profils des candidats sur la plateforme</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Nouveau Candidat</Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.totalCandidatures.toLocaleString()}</p>
                                <p className="text-xs text-gray-600">Total Candidatures</p>
                                <p className="text-xs text-green-600">+23% ce mois</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-yellow-100 rounded-sm flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.enAttente}</p>
                                <p className="text-xs text-gray-600">En Attente</p>
                                <p className="text-xs text-gray-500">À traiter</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.enCoursExamen}</p>
                                <p className="text-xs text-gray-600">En cours d'examen</p>
                                <p className="text-xs text-gray-500">En processus</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.approuvees}</p>
                                <p className="text-xs text-gray-600">Approuvées</p>
                                <p className="text-xs text-green-600">+12% ce mois</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.scoreMoyen}%</p>
                                <p className="text-xs text-gray-600">Score de moyen</p>
                                <p className="text-xs text-gray-500">Évaluation</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.tauxConversion}%</p>
                                <p className="text-xs text-gray-600">Taux de conversion</p>
                                <p className="text-xs text-gray-500">Ce mois</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Rechercher par nom, email, domaine..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="en_attente">En attente</SelectItem>
                                <SelectItem value="en_cours">En cours</SelectItem>
                                <SelectItem value="approuvee">Approuvée</SelectItem>
                                <SelectItem value="rejetee">Rejetée</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrer
                        </Button>
                        <Button variant="outline" size="sm">
                            Exporter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Candidatures List */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Candidats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {candidatures.map((candidature) => (
                            <div
                                key={candidature.id}
                                className="flex items-center justify-between p-4 border rounded-sm hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                        {candidature.candidateName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{candidature.candidateName}</h3>
                                        <p className="text-sm text-gray-600">{candidature.candidateEmail}</p>
                                        <p className="text-sm text-gray-500">{candidature.position}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Score IA</p>
                                        <p className="text-lg font-bold text-blue-600">{candidature.score}%</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Candidature reçue le</p>
                                        <p className="text-sm font-medium">
                                            {new Date(candidature.appliedDate).toLocaleDateString("fr-FR")}
                                        </p>
                                    </div>

                                    {getStatusBadge(candidature.status)}

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-4 h-4 mr-1" />
                                            Voir le profil
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            CV
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Contact
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <p className="text-sm text-gray-600">Sélectionnez les candidats pour des actions en lot</p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                Exporter CSV
                            </Button>
                            <Button variant="outline" size="sm">
                                Envoyer Message
                            </Button>
                            <Button variant="outline" size="sm">
                                Analyser Groupe
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

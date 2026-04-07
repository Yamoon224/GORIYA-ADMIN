"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { jobService } from "@/lib/services/job.service"
import type { IJobOffer } from "@/lib/@types/entities"
import { Briefcase, MapPin, Calendar, Users, Plus, Search, Filter, MoreHorizontal, Eye, Edit } from "lucide-react"

export default function Page() {
    const [stats, setStats] = useState({
        activeOffers: 8456,
        interestedCandidates: 34567,
        satisfactionRate: 87,
        newOffers: 127,
    })
    const [jobOffers, setJobOffers] = useState<IJobOffer[]>([])
    const [sectorDistribution, setSectorDistribution] = useState([
        { name: "Technologie", count: 2847, color: "#3B82F6" },
        { name: "Marketing", count: 1563, color: "#10B981" },
        { name: "Vente", count: 1245, color: "#F59E0B" },
        { name: "Design", count: 801, color: "#EF4444" },
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, offersData, sectorsData] = await Promise.all([
                    jobService.getStats(),
                    jobService.getJobs({ page: 1, limit: 10 }),
                    jobService.getSectorDistribution(),
                ])

                setStats(statsData)
                setJobOffers(
                    offersData.offers || [
                        {
                            id: "1",
                            title: "Développeur React Senior",
                            company: "TechCorp Solutions",
                            location: "Paris, France",
                            type: "CDI",
                            salary: "55k - 70k €",
                            postedDate: "2024-01-15",
                            applicants: 23,
                            status: "active",
                            description: "Nous recherchons un développeur React expérimenté...",
                        },
                        {
                            id: "2",
                            title: "Digital Product Marketing Digital",
                            company: "Marketing Pro",
                            location: "Lyon, France",
                            type: "CDI",
                            salary: "45k - 60k €",
                            postedDate: "2024-01-14",
                            applicants: 18,
                            status: "active",
                            description: "Rejoignez notre équipe marketing dynamique...",
                        },
                        {
                            id: "3",
                            title: "Ingénieur DevOps",
                            company: "Cloud Systems",
                            location: "Remote",
                            type: "CDI",
                            salary: "60k - 80k €",
                            postedDate: "2024-01-13",
                            applicants: 31,
                            status: "active",
                            description: "Expertise en infrastructure cloud requise...",
                        },
                    ],
                )
                setSectorDistribution(sectorsData || sectorDistribution)
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const getStatusBadge = (status: string) => {
        const variants = {
            active: "bg-green-100 text-green-800",
            closed: "bg-red-100 text-red-800",
            draft: "bg-yellow-100 text-yellow-800",
        }
        return variants[status as keyof typeof variants] || variants.active
    }

    const getTypeBadge = (type: string) => {
        const variants = {
            CDI: "bg-blue-100 text-blue-800",
            CDD: "bg-purple-100 text-purple-800",
            Stage: "bg-orange-100 text-orange-800",
            Freelance: "bg-gray-100 text-gray-800",
        }
        return variants[type as keyof typeof variants] || variants.CDI
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64">Chargement...</div>
    }

    return (
        <div className="p-2 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Offres d'Emploi</h1>
                    <p className="text-gray-600">Gérez toutes les offres d'emploi et les candidatures</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Offre
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Offres Actives</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeOffers.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">+12% ce mois</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Candidats Intéressés</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.interestedCandidates.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">+8% ce mois</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Taux de Satisfaction</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.satisfactionRate}%</p>
                                <p className="text-xs text-gray-500">+3% ce mois</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Nouvelles Offres</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.newOffers}</p>
                                <p className="text-xs text-gray-500">Cette semaine</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Plus className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Rechercher une offre, entreprise, localisation..." className="pl-10" />
                </div>
                <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                </Button>
                <Button variant="outline">Exporter</Button>
                <Button variant="outline">Voir en grille</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Job Offers List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Liste des Offres d'Emploi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {jobOffers.map((offer) => (
                                    <div key={offer.id} className="border rounded-sm p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                                    <Briefcase className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                                                    <p className="text-sm text-gray-600">{offer.company}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {offer.location}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(offer.postedDate).toLocaleDateString("fr-FR")}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            {offer.applicants} candidats
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <Badge className={getTypeBadge(offer.type)}>{offer.type}</Badge>
                                                        <Badge className={getStatusBadge(offer.status)}>
                                                            {offer.status === "active" ? "Active" : offer.status}
                                                        </Badge>
                                                        <span className="text-sm font-medium text-gray-900">{offer.salary}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Sector Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Répartition par Secteur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {sectorDistribution.map((sector) => (
                                    <div key={sector.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                                            <span className="text-sm text-gray-600">{sector.name}</span>
                                        </div>
                                        <span className="text-sm font-medium">{sector.count}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions de Gestion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter une Offre d'Emploi
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Users className="w-4 h-4 mr-2" />
                                    Importer des Candidats
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Planifier un Entretien
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Gérer les Applications
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alert */}
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                                <div>
                                    <p className="text-sm font-medium text-orange-800">Offres Importantes</p>
                                    <p className="text-xs text-orange-600 mt-1">
                                        12 offres expirent dans les 7 prochains jours. Consultez-les pour les renouveler ou les archiver.
                                    </p>
                                    <Button variant="link" className="text-orange-700 p-0 h-auto text-xs mt-2">
                                        Voir les offres expirantes
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

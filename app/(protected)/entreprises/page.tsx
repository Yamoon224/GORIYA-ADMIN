"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Users, Briefcase, TrendingUp, Search, Plus, MoreHorizontal, Eye } from "lucide-react"
import { companyService } from "@/lib/services/company.service"
import type { ICompany } from "@/lib/@types/entities"

export default function EntreprisesPage() {
    const [stats, setStats] = useState({
        entreprisesActives: 1234,
        nouvellesEntreprises: 456,
        offresActives: 8456,
        candidatsPlaces: 34567,
    })
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [sectorDistribution, setSectorDistribution] = useState([
        { sector: "Technologie", count: 423, color: "bg-blue-500" },
        { sector: "Finance", count: 267, color: "bg-teal-500" },
        { sector: "Santé", count: 189, color: "bg-green-500" },
        { sector: "Éducation", count: 156, color: "bg-purple-500" },
        { sector: "Commerce", count: 134, color: "bg-orange-500" },
        { sector: "Industrie", count: 112, color: "bg-red-500" },
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [statsData, companiesData, sectorsData] = await Promise.all([
                companyService.getStats(),
                companyService.getCompanies(),
                companyService.getSectorDistribution(),
            ])
            setStats(statsData)
            setCompanies(companiesData.companies || [])
            setSectorDistribution(sectorsData)
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
            // Mock data for demo
            setCompanies([
                {
                    id: "1",
                    name: "TechCorp Solutions",
                    sector: "Technologie",
                    activeOffers: 12,
                    placedCandidates: 247,
                    partnershipDate: "2023-01-15",
                    logo: "/placeholder-logo.png",
                    status: "active",
                },
                {
                    id: "2",
                    name: "Digital Marketing Pro",
                    sector: "Marketing",
                    activeOffers: 8,
                    placedCandidates: 189,
                    partnershipDate: "2023-03-20",
                    logo: "/placeholder-logo.png",
                    status: "active",
                },
                {
                    id: "3",
                    name: "Green Energy Corp",
                    sector: "Énergie",
                    activeOffers: 15,
                    placedCandidates: 334,
                    partnershipDate: "2022-11-10",
                    logo: "/placeholder-logo.png",
                    status: "active",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Entreprises Partenaires</h1>
                    <p className="text-gray-600">Gérez vos partenaires entreprises</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Entreprise
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Entreprises Actives</p>
                                <p className="text-2xl font-bold">{stats.entreprisesActives.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">+8% par rapport au mois dernier</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Nouvelles Entreprises</p>
                                <p className="text-2xl font-bold">{stats.nouvellesEntreprises}</p>
                                <p className="text-xs text-gray-500">+15% par rapport au mois dernier</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Offres Actives</p>
                                <p className="text-2xl font-bold">{stats.offresActives.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">+12% par rapport au mois dernier</p>
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
                                <p className="text-sm text-gray-600">Candidats Placés</p>
                                <p className="text-2xl font-bold">{stats.candidatsPlaces.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">+18% par rapport au mois dernier</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sector Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition par Secteur</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sectorDistribution.map((sector, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                                        <span className="text-sm">{sector.sector}</span>
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
                        <CardTitle>Actions Rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Building2 className="w-4 h-4 mr-2" />
                            Ajouter une Offre d'Emploi
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Users className="w-4 h-4 mr-2" />
                            Rapport de Candidatures
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Statistiques de Performance
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activité Récente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Nouvelle entreprise ajoutée</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>5 nouvelles offres publiées</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span>12 candidats placés cette semaine</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input placeholder="Rechercher par nom, secteur, localisation..." className="pl-10" />
                            </div>
                        </div>
                        <Button variant="outline">Secteur</Button>
                        <Button variant="outline">Localisation</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Companies List */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Entreprises</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="flex items-center justify-between p-4 border rounded-sm hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{company.name}</h3>
                                        <p className="text-sm text-gray-600">{company.sector}</p>
                                        <p className="text-sm text-gray-500">
                                            Partenaire depuis {new Date(company.partnershipDate).getFullYear()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-blue-600">{company.activeOffers}</p>
                                        <p className="text-xs text-gray-600">Offres actives</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg font-bold text-green-600">{company.placedCandidates}</p>
                                        <p className="text-xs text-gray-600">Candidats placés</p>
                                    </div>

                                    <Badge className="bg-green-100 text-green-800">Active</Badge>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-4 h-4 mr-1" />
                                            Voir Profil
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
    )
}

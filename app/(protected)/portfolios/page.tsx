"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { portfolioService } from "@/lib/services/portfolio.service"
import type { IPortfolio } from "@/lib/@types/entities"
import { FileText, Eye, Download, Heart, Search, Filter, Grid, List, ExternalLink, Mail } from "lucide-react"

export default function Page() {
    const [stats, setStats] = useState({
        totalPortfolios: 567,
        totalViews: 47943,
        totalDownloads: 4176,
        totalLikes: 1347,
    })
    const [portfolios, setPortfolios] = useState<IPortfolio[]>([])
    const [featuredPortfolios, setFeaturedPortfolios] = useState<IPortfolio[]>([])
    const [popularCategories, setPopularCategories] = useState([
        { name: "Développement", count: 156, color: "#3B82F6" },
        { name: "Design", count: 89, color: "#10B981" },
        { name: "Marketing", count: 67, color: "#F59E0B" },
        { name: "Data Science", count: 45, color: "#EF4444" },
    ])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, portfoliosData, featuredData, categoriesData] = await Promise.all([
                    portfolioService.getStats(),
                    portfolioService.getPortfolios({ page: 1, limit: 12 }),
                    portfolioService.getFeaturedPortfolios(),
                    portfolioService.getPopularCategories(),
                ])

                setStats(statsData)
                setPortfolios(
                    portfoliosData.portfolios || [
                        {
                            id: "1",
                            candidateName: "Lucas Rousseau",
                            candidateEmail: "lucas.rousseau@email.com",
                            title: "Développeur Full-Stack",
                            description: "Passionné par le développement web moderne avec React et Node.js",
                            skills: ["React", "Node.js", "TypeScript", "MongoDB"],
                            projects: [
                                {
                                    name: "E-commerce Platform",
                                    description: "Plateforme e-commerce complète avec React et Node.js",
                                    technologies: ["React", "Node.js", "MongoDB"],
                                },
                            ],
                            views: 1247,
                            downloads: 89,
                            likes: 156,
                            createdDate: "2024-01-10",
                            avatar: "/placeholder.svg?height=40&width=40",
                        },
                        {
                            id: "2",
                            candidateName: "Emma Martin",
                            candidateEmail: "emma.martin@email.com",
                            title: "UX/UI Designer",
                            description: "Designer créative spécialisée dans l'expérience utilisateur",
                            skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
                            projects: [
                                {
                                    name: "Mobile Banking App",
                                    description: "Design d'une application bancaire mobile",
                                    technologies: ["Figma", "Prototyping"],
                                },
                            ],
                            views: 892,
                            downloads: 67,
                            likes: 134,
                            createdDate: "2024-01-08",
                            avatar: "/placeholder.svg?height=40&width=40",
                        },
                        {
                            id: "3",
                            candidateName: "Alex Moreau",
                            candidateEmail: "alex.moreau@email.com",
                            title: "Data Scientist",
                            description: "Expert en analyse de données et machine learning",
                            skills: ["Python", "TensorFlow", "Pandas", "SQL"],
                            projects: [
                                {
                                    name: "Predictive Analytics Dashboard",
                                    description: "Dashboard d'analyse prédictive pour le retail",
                                    technologies: ["Python", "TensorFlow", "React"],
                                },
                            ],
                            views: 756,
                            downloads: 45,
                            likes: 98,
                            createdDate: "2024-01-05",
                            avatar: "/placeholder.svg?height=40&width=40",
                        },
                    ],
                )
                setFeaturedPortfolios(featuredData || portfolios.slice(0, 3))
                setPopularCategories(categoriesData || popularCategories)
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleLike = async (portfolioId: string) => {
        try {
            await portfolioService.featurePortfolio(portfolioId, true)
            // Update local state
            setPortfolios((prev) => prev.map((p) => (p.id === portfolioId ? { ...p, likes: p.likes + 1 } : p)))
        } catch (error) {
            console.error("Erreur lors du like:", error)
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64">Chargement...</div>
    }

    return (
        <div className="p-6 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio Candidats</h1>
                    <p className="text-gray-600">Découvrez les portfolios et projets des candidats</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Portfolios</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalPortfolios}</p>
                                <p className="text-xs text-gray-500">Total disponibles</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Vues Totales</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Ce mois</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Téléchargements</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Ce mois</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Appréciations</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Total</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-sm flex items-center justify-center">
                                <Heart className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="space-y-2">
                    {/* Popular Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Catégories Populaires</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {popularCategories.map((category) => (
                                    <div key={category.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                            <span className="text-sm text-gray-600">{category.name}</span>
                                        </div>
                                        <span className="text-sm font-medium">{category.count}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Featured Portfolios */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolios en Vedette</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {featuredPortfolios.slice(0, 3).map((portfolio) => (
                                    <div key={portfolio.id} className="border rounded-sm p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <img
                                                src={portfolio.avatar || "/placeholder.svg"}
                                                alt={portfolio.candidateName}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-medium text-sm text-gray-900">{portfolio.candidateName}</h4>
                                                <p className="text-xs text-gray-500">{portfolio.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {portfolio.views}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-3 h-3" />
                                                {portfolio.likes}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Tous les Portfolios</CardTitle>
                                <Button variant="outline" size="sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filtrer
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-1"}
                            >
                                {portfolios.map((portfolio) => (
                                    <div
                                        key={portfolio.id}
                                        className={`border rounded-sm p-4 hover:shadow-md transition-shadow ${viewMode === "list" ? "flex items-center gap-4" : ""}`}
                                    >
                                        <div className={`${viewMode === "list" ? "flex-shrink-0" : "mb-4"}`}>
                                            <div className="w-16 h-16 bg-gray-200 rounded-sm flex items-center justify-center">
                                                <FileText className="w-8 h-8 text-gray-400" />
                                            </div>
                                        </div>

                                        <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={portfolio.avatar || "/placeholder.svg"}
                                                        alt={portfolio.candidateName}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{portfolio.candidateName}</h3>
                                                        <p className="text-sm text-gray-600">{portfolio.title}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => handleLike(portfolio.id)}>
                                                    <Heart className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">{portfolio.description}</p>

                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {portfolio.skills.slice(0, 3).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {portfolio.skills.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{portfolio.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {portfolio.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Download className="w-4 h-4" />
                                                        {portfolio.downloads}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" />
                                                        {portfolio.likes}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
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

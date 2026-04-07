"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Download, MapPin, Clock, Star } from "lucide-react"
import { searchService, type ISearchFilters } from "@/lib/services/search.service"
import type { IUser, IJobOffer } from "@/lib/@types/entities"

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("")
    const [results, setResults] = useState<(IUser | IJobOffer)[]>([])
    const [filters, setFilters] = useState<ISearchFilters>({
        type: "all",
        minScore: 0,
    })
    const [loading, setLoading] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        setLoading(true)
        try {
            const data = await searchService.search(searchQuery, filters)
            setResults(data.results || [])
        } catch (error) {
            console.error("Erreur lors de la recherche:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleExport = async () => {
        try {
            const blob = await searchService.exportResults(searchQuery, filters)
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "recherche-resultats.csv"
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Erreur lors de l'export:", error)
        }
    }

    // Données de démonstration
    const demoResults: SearchResult[] = [
        {
            id: "1",
            name: "Sophie Martin",
            email: "sophie.martin@email.com",
            type: "candidate",
            position: "Développeur React Senior",
            location: "Paris",
            experience: "5+ ans",
            skills: ["React", "TypeScript", "Node.js"],
            matchingScore: 95,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "available",
        },
        {
            id: "2",
            name: "Full Stack Developer",
            email: "contact@techcorp.com",
            type: "offer",
            company: "TechCorp",
            location: "Lyon",
            experience: "3-5 ans",
            skills: ["JavaScript", "Python", "MongoDB"],
            matchingScore: 88,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "available",
        },
        {
            id: "3",
            name: "Marc Leblanc",
            email: "marc.leblanc@email.com",
            type: "candidate",
            position: "UX Designer",
            location: "Marseille",
            experience: "4+ ans",
            skills: ["Figma", "Adobe XD", "Prototyping"],
            matchingScore: 82,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "busy",
        },
        {
            id: "4",
            name: "UX Designer",
            email: "hr@designstudio.com",
            type: "offer",
            company: "DesignStudio",
            location: "Nice",
            experience: "2-4 ans",
            skills: ["UI/UX", "Design System", "User Research"],
            matchingScore: 79,
            avatar: "/placeholder.svg?height=40&width=40",
            status: "available",
        },
    ]

    useEffect(() => {
        setResults(demoResults)
    }, [])

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Recherche Avancée</h1>
                    <p className="text-gray-600">Moteur de recherche intelligent pour candidats et offres d'emploi</p>
                </div>
                <Button onClick={handleExport} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter Résultats
                </Button>
            </div>

            {/* Barre de recherche */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Rechercher candidats, postes, compétences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                className="text-lg"
                            />
                        </div>
                        <Button onClick={handleSearch} disabled={loading}>
                            <Search className="w-4 h-4 mr-2" />
                            Rechercher
                        </Button>
                        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                            <Filter className="w-4 h-4 mr-2" />
                            Filtres Avancés
                        </Button>
                    </div>

                    {/* Filtres avancés */}
                    {showFilters && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-sm space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Type de recherche</label>
                                    <Select value={filters.type} onValueChange={(value: any) => setFilters({ ...filters, type: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tous</SelectItem>
                                            <SelectItem value="candidate">Candidats</SelectItem>
                                            <SelectItem value="offer">Offres d'emploi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Localisation</label>
                                    <Input
                                        placeholder="Ville, région..."
                                        value={filters.location || ""}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Années d'expérience</label>
                                    <Select
                                        value={filters.experience || ""}
                                        onValueChange={(value) => setFilters({ ...filters, experience: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-1">0-1 ans</SelectItem>
                                            <SelectItem value="2-3">2-3 ans</SelectItem>
                                            <SelectItem value="4-5">4-5 ans</SelectItem>
                                            <SelectItem value="5+">5+ ans</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Secteur</label>
                                    <Select
                                        value={filters.sector || ""}
                                        onValueChange={(value) => setFilters({ ...filters, sector: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Technologie</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Score minimum: {filters.minScore}%</label>
                                <Slider
                                    value={[filters.minScore || 0]}
                                    onValueChange={(value) => setFilters({ ...filters, minScore: value[0] })}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Résultats */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">{results.length} résultats trouvés</p>
                <div className="text-sm text-gray-500">Plus pertinent</div>
            </div>

            <div className="space-y-4">
                {results.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={result.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>
                                            {result.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{result.name}</h3>
                                            <Badge variant={result.type === "candidate" ? "default" : "secondary"}>
                                                {result.type === "candidate" ? "Candidat" : "Offre"}
                                            </Badge>
                                            <Badge
                                                variant={result.status === "available" ? "default" : "secondary"}
                                                className={result.status === "available" ? "bg-green-100 text-green-800" : ""}
                                            >
                                                {result.status === "available" ? "Disponible" : "Occupé"}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-600 mb-2">{result.position || result.company}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {result.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {result.experience}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4" />
                                                {result.matchingScore}% match
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {result.skills.map((skill) => (
                                                <Badge key={skill} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Button size="sm">Voir Profil</Button>
                                    <Button size="sm" variant="outline">
                                        Contact
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm">
                    Précédent
                </Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">
                    2
                </Button>
                <Button variant="outline" size="sm">
                    3
                </Button>
                <Button variant="outline" size="sm">
                    Suivant
                </Button>
            </div>
        </div>
    )
}

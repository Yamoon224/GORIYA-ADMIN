"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
    Download,
    Search,
    Filter,
    MapPin,
    Clock3,
    Briefcase,
    Star,
} from "lucide-react"

type ResultItem = {
    id: string
    kind: "candidate" | "offer"
    initials: string
    title: string
    subtitle: string
    location: string
    metaOne: string
    metaTwo: string
    tags: string[]
    score?: string
    scoreBadge?: string
    actionLabel: string
    actionSubLabel?: string
}

const quickTags = ["Développeurs", "Designers", "Data Scientists", "Marketing", "Remote"]

const mockResults: ResultItem[] = [
    {
        id: "1",
        kind: "candidate",
        initials: "SM",
        title: "Sophie Martin",
        subtitle: "Développeuse React Senior",
        location: "Abidjan Cocody",
        metaOne: "5+ ans",
        metaTwo: "Disponible immédiatement",
        tags: ["React", "TypeScript", "Node.js", "AWS"],
        score: "94/100",
        scoreBadge: "Candidat",
        actionLabel: "Voir Profil",
    },
    {
        id: "2",
        kind: "offer",
        initials: "TC",
        title: "Full Stack Developer",
        subtitle: "TechCorp",
        location: "Abidjan Cocody",
        metaOne: "350 000 F",
        metaTwo: "Il y a 2 jours",
        tags: ["JavaScript", "Python", "MongoDB", "Docker"],
        actionLabel: "Voir Offre",
        actionSubLabel: "23 candidatures",
    },
    {
        id: "3",
        kind: "candidate",
        initials: "ML",
        title: "Marc Leblanc",
        subtitle: "Data Scientist",
        location: "Abidjan Cocody",
        metaOne: "3+ ans",
        metaTwo: "Disponible en mars",
        tags: ["Python", "Machine Learning", "SQL", "Tableau"],
        score: "87/100",
        scoreBadge: "Candidat",
        actionLabel: "Voir Profil",
    },
    {
        id: "4",
        kind: "offer",
        initials: "IS",
        title: "UX Designer",
        subtitle: "InnoSoft",
        location: "Abidjan Cocody",
        metaOne: "350 000 F",
        metaTwo: "Il y a 1 semaine",
        tags: ["Figma", "Adobe Creative", "User Research", "Prototyping"],
        actionLabel: "Voir Offre",
        actionSubLabel: "18 candidatures",
    },
]

export default function Page() {
    const [query, setQuery] = useState("")
    const [includeCandidates, setIncludeCandidates] = useState(true)
    const [includeOffers, setIncludeOffers] = useState(true)
    const [experience, setExperience] = useState([2])
    const [minScore, setMinScore] = useState([70])

    const filteredResults = useMemo(() => {
        const q = query.trim().toLowerCase()
        return mockResults.filter((item) => {
            const includeKind = (item.kind === "candidate" && includeCandidates) || (item.kind === "offer" && includeOffers)
            const matches =
                !q ||
                [item.title, item.subtitle, item.location, ...item.tags]
                    .join(" ")
                    .toLowerCase()
                    .includes(q)
            return includeKind && matches
        })
    }, [query, includeCandidates, includeOffers])

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Recherche Avancée</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">
                        Moteur de recherche intelligent pour candidats et offres d'emploi
                    </p>
                </div>

                <Button className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                    <Download className="h-3.5 w-3.5" />
                    Exporter Résultats
                </Button>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f96a7]" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Rechercher candidats, postes, compétences..."
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] pl-9 text-[12px] text-[#313847] shadow-none"
                            />
                        </div>
                        <Button className="h-10 rounded-full bg-[#2f80ed] px-5 text-[12px] font-semibold text-white hover:bg-[#2575e3]">
                            <Search className="h-3.5 w-3.5" />
                            Rechercher
                        </Button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {quickTags.map((tag) => (
                            <Badge key={tag} className="rounded-full border border-[#e7ebf3] bg-white px-2 py-0.5 text-[10px] text-[#3f4657]">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[28px] font-semibold text-[#242a38]">
                            <Filter className="h-4 w-4" />
                            Filtres Avancés
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Type de recherche</p>
                                <div className="space-y-2 text-[12px]">
                                    <label className="flex items-center gap-2 text-[#4a5162]">
                                        <Checkbox checked={includeCandidates} onCheckedChange={(value) => setIncludeCandidates(Boolean(value))} />
                                        Candidats
                                    </label>
                                    <label className="flex items-center gap-2 text-[#4a5162]">
                                        <Checkbox checked={includeOffers} onCheckedChange={(value) => setIncludeOffers(Boolean(value))} />
                                        Offres d'emploi
                                    </label>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Localisation</p>
                                <Select defaultValue="abidjan">
                                    <SelectTrigger className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567]">
                                        <SelectValue placeholder="Choisir une ville" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="abidjan">Choisir une ville</SelectItem>
                                        <SelectItem value="cocody">Abidjan Cocody</SelectItem>
                                        <SelectItem value="plateau">Abidjan Plateau</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Années d'expérience</p>
                                <Slider value={experience} onValueChange={setExperience} max={10} step={1} className="[&_[data-slot=slider-range]]:bg-[#3f7fe8]" />
                                <div className="mt-1 flex justify-between text-[10px] text-[#8a92a3]">
                                    <span>0 ans</span>
                                    <span>10+ ans</span>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Score minimum</p>
                                <Slider value={minScore} onValueChange={setMinScore} max={100} step={1} className="[&_[data-slot=slider-range]]:bg-[#3f7fe8]" />
                                <div className="mt-1 flex justify-between text-[10px] text-[#8a92a3]">
                                    <span>0</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-[12px] font-medium text-[#4a5162]">Secteur</p>
                                <Select defaultValue="all">
                                    <SelectTrigger className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567]">
                                        <SelectValue placeholder="Tous secteurs" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous secteurs</SelectItem>
                                        <SelectItem value="tech">Technologie</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button variant="outline" className="h-9 w-full rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                                Réinitialiser Filtres
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-[13px] text-[#7f8797]">{filteredResults.length} résultats trouvés</p>
                        <Select defaultValue="pertinent">
                            <SelectTrigger className="h-9 w-[170px] rounded-lg border-[#eceff5] bg-[#f8f9fc] text-[12px] text-[#4d5567]">
                                <SelectValue placeholder="Tri" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pertinent">Plus pertinent</SelectItem>
                                <SelectItem value="recent">Plus récent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {filteredResults.map((item) => (
                        <Card key={item.id} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                            <CardContent className="px-4 py-4">
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[11px] font-semibold text-white">
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="text-[16px] font-semibold text-[#232a38]">{item.title}</p>
                                                <Badge className="rounded-full border-0 bg-[#e7f0ff] px-2 py-0.5 text-[10px] text-[#2f80ed]">
                                                    {item.kind === "candidate" ? "Candidat" : "Offre"}
                                                </Badge>
                                                {item.score ? (
                                                    <Badge className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]">
                                                        {item.score}
                                                    </Badge>
                                                ) : null}
                                            </div>
                                            <p className="text-[24px] leading-none text-[#7f8797]">{item.subtitle}</p>

                                            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#7f8797]">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {item.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    {item.kind === "candidate" ? <Briefcase className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                                                    {item.metaOne}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock3 className="h-3.5 w-3.5" />
                                                    {item.metaTwo}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {item.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        className="rounded-full border border-[#e7ebf3] bg-white px-2 py-0.5 text-[10px] text-[#3f4657]"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <Button className="h-9 rounded-full bg-[#2f80ed] px-4 text-[12px] font-semibold text-white hover:bg-[#2575e3]">
                                            {item.actionLabel}
                                        </Button>
                                        {item.actionSubLabel ? (
                                            <p className="mt-2 text-[11px] text-[#7f8797]">{item.actionSubLabel}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">Précédent</Button>
                        <Button className="h-8 rounded-lg bg-[#2f80ed] px-3 text-[11px] text-white hover:bg-[#2575e3]">1</Button>
                        <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">2</Button>
                        <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">3</Button>
                        <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">Suivant</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { useMemo, useState } from "react"
import {
    Eye,
    Image,
    Plus,
    Search,
    Filter,
    Star,
    ExternalLink,
    Trophy,
    FolderOpen,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const topTags = [
    "Développement (156)",
    "Design (89)",
    "Data Science (67)",
    "Marketing (45)",
]

const categories = [
    { name: "Développement", count: 156, delta: "+23%" },
    { name: "Design", count: 89, delta: "+18%" },
    { name: "Data Science", count: 67, delta: "+31%" },
    { name: "Marketing", count: 45, delta: "+12%" },
]

type PortfolioCard = {
    id: string
    initials: string
    name: string
    role: string
    title: string
    description: string
    tags: string[]
    views: number
    stars: string
    update: string
    featured?: boolean
}

const featuredPortfolios: PortfolioCard[] = [
    {
        id: "f1",
        initials: "SM",
        name: "Sophie Martin",
        role: "Développeuse Web",
        title: "Portfolio Développeuse Full-Stack",
        description: "Portfolio moderne présentant des applications web complètes",
        tags: ["8 projets"],
        views: 1247,
        stars: "4.9",
        update: "",
        featured: true,
    },
    {
        id: "f2",
        initials: "AL",
        name: "Alice Laurent",
        role: "Design",
        title: "Design UX/UI & Branding",
        description: "Créations visuelles et expériences utilisateur immersives",
        tags: ["15 projets"],
        views: 1563,
        stars: "4.8",
        update: "",
        featured: true,
    },
]

const allPortfolios: PortfolioCard[] = [
    {
        id: "1",
        initials: "SM",
        name: "Sophie Martin",
        role: "Développeuse Web",
        title: "Portfolio Développeuse Full-Stack",
        description: "Portfolio moderne présentant des applications web complètes",
        tags: ["React", "Node.js", "MongoDB", "+1"],
        views: 1247,
        stars: "4.9",
        update: "Mis à jour il y a 2 jours",
        featured: true,
    },
    {
        id: "2",
        initials: "MD",
        name: "Marc Dubois",
        role: "Data Science",
        title: "Projet Data Science & IA",
        description: "Analyses prédictives et modèles d'apprentissage automatique",
        tags: ["Python", "TensorFlow", "Tableau", "+1"],
        views: 882,
        stars: "4.7",
        update: "Mis à jour il y a 1 semaine",
    },
    {
        id: "3",
        initials: "AL",
        name: "Alice Laurent",
        role: "Design",
        title: "Design UX/UI & Branding",
        description: "Créations visuelles et expériences utilisateur innovantes",
        tags: ["Figma", "Adobe XD", "Illustrator", "+1"],
        views: 1563,
        stars: "4.8",
        update: "Mis à jour il y a 3 jours",
        featured: true,
    },
    {
        id: "4",
        initials: "PM",
        name: "Paul Moreau",
        role: "Marketing",
        title: "Marketing Digital & Analytics",
        description: "Campagnes marketing et analyses de performance",
        tags: ["Google Analytics", "Facebook Ads", "SEO", "+1"],
        views: 964,
        stars: "4.5",
        update: "Mis à jour il y a 5 jours",
    },
]

export default function Page() {
    const [query, setQuery] = useState("")

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return allPortfolios
        return allPortfolios.filter((item) =>
            [item.name, item.role, item.title, item.description, ...item.tags].join(" ").toLowerCase().includes(q),
        )
    }, [query])

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Portfolios Candidats</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">
                        Vitrine des créations et projets des talents de la plateforme
                    </p>
                </div>

                <Button className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                    <Plus className="h-3.5 w-3.5" />
                    Créer Portfolio
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Kpi title="Portfolios Actifs" value="357" icon={FolderOpen} />
                <Kpi title="Vues Totales" value="47,293" icon={Eye} />
                <Kpi title="Note Moyenne" value="4.7/5" icon={Star} />
                <Kpi title="Projets Présentés" value="1,247" icon={Image} />
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f96a7]" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Rechercher portfolio par nom, domaine, technologies..."
                                className="h-10 rounded-lg border-[#edf0f5] bg-[#f8f9fc] pl-9 text-[12px] text-[#313847] shadow-none"
                            />
                        </div>
                        <Button variant="outline" className="h-10 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-4 text-[12px] text-[#4d5567] hover:bg-[#f1f4fa]">
                            <Filter className="h-3.5 w-3.5" />
                            Filtres
                        </Button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {topTags.map((tag) => (
                            <Badge key={tag} className="rounded-full border border-[#e7ebf3] bg-white px-2 py-0.5 text-[10px] text-[#3f4657]">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[300px_1fr]">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[24px] font-semibold text-[#242a38]">
                            <Star className="h-4 w-4" />
                            Catégories Populaires
                        </h2>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.name} className="flex items-center justify-between rounded-lg border border-[#ebeff6] bg-[#f8f9fc] px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#edf3ff] text-[#3f7fe8]">
                                            <Star className="h-3 w-3" />
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-medium text-[#2f3647]">{category.name}</p>
                                            <p className="text-[10px] text-[#8a92a3]">{category.count} portfolios</p>
                                        </div>
                                    </div>
                                    <Badge className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]">
                                        {category.delta}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="px-4 py-4">
                        <h2 className="mb-4 flex items-center gap-2 text-[24px] font-semibold text-[#242a38]">
                            <Trophy className="h-4 w-4" />
                            Portfolios en Vedette
                        </h2>

                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            {featuredPortfolios.map((item) => (
                                <div key={item.id} className="rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[10px] font-semibold text-white">
                                                {item.initials}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-medium text-[#252c3b]">{item.name}</p>
                                                <p className="text-[10px] text-[#7f8797]">{item.role}</p>
                                            </div>
                                        </div>
                                        <Badge className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]">
                                            Vedette
                                        </Badge>
                                    </div>

                                    <p className="mt-2 text-[13px] font-medium text-[#2d3443]">{item.title}</p>
                                    <p className="mt-1 text-[11px] text-[#8a92a3]">{item.description}</p>

                                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#8a92a3]">
                                        <span>{item.tags[0]}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {item.views}</span>
                                            <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {item.stars}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                <CardContent className="px-4 py-4">
                    <h2 className="mb-4 text-[30px] font-semibold text-[#242a38]">Tous les Portfolios</h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((item) => (
                            <div key={item.id} className="rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3">
                                <div className="mb-3 flex h-36 items-center justify-center rounded-lg border border-[#edf0f6] bg-[#f9fbff] text-[#8693a8]">
                                    <Image className="h-8 w-8" />
                                </div>

                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4e8df3] to-[#6b47e8] text-[10px] font-semibold text-white">
                                            {item.initials}
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-medium text-[#252c3b]">{item.name}</p>
                                            <p className="text-[10px] text-[#7f8797]">{item.role}</p>
                                        </div>
                                    </div>
                                    {item.featured ? (
                                        <Badge className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]">Vedette</Badge>
                                    ) : null}
                                </div>

                                <p className="mt-2 text-[13px] font-medium text-[#2d3443]">{item.title}</p>
                                <p className="mt-1 text-[11px] text-[#8a92a3]">{item.description}</p>

                                <div className="mt-2 flex flex-wrap gap-1">
                                    {item.tags.map((tag) => (
                                        <Badge key={tag} className="rounded-full border border-[#e7ebf3] bg-white px-2 py-0.5 text-[10px] text-[#3f4657]">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center justify-between text-[10px] text-[#8a92a3]">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {item.views}</span>
                                        <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {item.stars}</span>
                                    </div>
                                    <Button variant="ghost" className="h-6 w-6 p-0 text-[#697286] hover:bg-[#f2f5fb]">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </Button>
                                </div>

                                <p className="mt-2 text-[10px] text-[#a0a8b7]">{item.update}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

type KpiProps = {
    title: string
    value: string
    icon: React.ComponentType<{ className?: string }>
}

function Kpi({ title, value, icon: Icon }: KpiProps) {
    return (
        <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
            <CardContent className="flex items-start justify-between px-4 py-4">
                <div>
                    <p className="text-[11px] text-[#8b92a3]">{title}</p>
                    <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{value}</p>
                </div>
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a89ef]">
                    <Icon className="h-4 w-4 text-white" />
                </div>
            </CardContent>
        </Card>
    )
}

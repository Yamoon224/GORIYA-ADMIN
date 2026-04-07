import {
    LayoutDashboard,
    Users,
    Building2,
    BarChart3,
    FileText,
    Settings,
    UserCheck,
    Briefcase,
    FileSearch,
    Calendar,
    Brain,
    Target,
    FolderOpen,
} from "lucide-react"

export const menuGroups = [
    {
        title: "Principal",
        items: [
            {
                title: "Tableau de bord",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Analytics",
                href: "/analytics",
                icon: BarChart3,
            },
        ],
    },
    {
        title: "Gestion",
        items: [
            {
                title: "Étudiants/Candidats",
                href: "/students",
                icon: Users,
            },
            {
                title: "Entreprises",
                href: "/entreprises",
                icon: Building2,
            },
            {
                title: "Gestion Utilisateurs",
                href: "/gestion-utilisateurs",
                icon: UserCheck,
            },
        ],
    },
    {
        title: "IA & Analyse",
        items: [
            {
                title: "Analyse IA des CV",
                href: "/analyze-ai",
                icon: Brain,
            },
            {
                title: "Matching IA Avancé",
                href: "/matching-ai",
                icon: Target,
            },
            {
                title: "Scoring IA",
                href: "/scoring-ai",
                icon: BarChart3,
            },
        ],
    },
    {
        title: "Emploi & Candidatures",
        items: [
            {
                title: "Offres d'Emploi",
                href: "/offres-emploi",
                icon: Briefcase,
            },
            {
                title: "Candidatures",
                href: "/candidatures",
                icon: FileText,
            },
        ],
    },
    {
        title: "Outils",
        items: [
            {
                title: "Recherche Avancée",
                href: "/recherche-avancee",
                icon: FileSearch,
            },
            {
                title: "Planification",
                href: "/planification",
                icon: Calendar,
            },
            {
                title: "Portfolios",
                href: "/portfolios",
                icon: FolderOpen,
            },
        ],
    },
    {
        title: "Configuration",
        items: [
            {
                title: "Paramètres",
                href: "/parametres",
                icon: Settings,
            },
        ],
    },
]
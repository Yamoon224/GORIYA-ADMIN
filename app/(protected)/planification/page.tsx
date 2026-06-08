"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Calendar,
    Clock3,
    Plus,
    Users,
    Video,
    Bell,
    CalendarDays,
    CheckCircle2,
    UserCircle2,
} from "lucide-react"

const stats = [
    { title: "Événements Aujourd'hui", value: "12", icon: Calendar },
    { title: "Entretiens Programmés", value: "5", icon: Users },
    { title: "Sessions Formation", value: "3", icon: Video },
    { title: "Taux de Présence", value: "94.2%", icon: CheckCircle2 },
]

const dayEvents = [
    {
        time: "14:00",
        duration: "45 min",
        title: "Entretien RH - Sophie Martin",
        type: "Entretien",
        location: "Visioconférence",
        people: "Sophie Martin, Marc Dubois (RH)",
        status: "Confirmé",
        statusClass: "bg-[#2f80ed] text-white",
    },
    {
        time: "16:30",
        duration: "2h",
        title: "Session Formation IA - Groupe A",
        type: "Formation",
        location: "Salle de formation",
        people: "25 participants",
        status: "Programmé",
        statusClass: "bg-[#edf0f6] text-[#3d4354]",
    },
]

const upcoming = [
    {
        title: "Webinaire Partenaires Coursera",
        date: "2024-01-17 • 10:00",
        source: "Teams",
        duration: "1h 30min",
    },
    {
        title: "Simulation Entretien - Alice Laurent",
        date: "2024-01-17 • 15:00",
        source: "Plateforme Goriya",
        duration: "30 min",
    },
]

export default function Page() {
    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-[39px] font-semibold leading-tight text-[#242a38]">Planification & Agenda</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">
                        Gestion centralisée des rendez-vous, entretiens et formations
                    </p>
                </div>

                <Button className="mt-1 h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]">
                    <Plus className="h-3.5 w-3.5" />
                    Nouvel Événement
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="flex items-start justify-between px-4 py-4">
                            <div>
                                <p className="text-[11px] text-[#8b92a3]">{stat.title}</p>
                                <p className="mt-3 text-[35px] leading-none font-semibold text-[#232a38]">{stat.value}</p>
                            </div>
                            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a89ef]">
                                <stat.icon className="h-4 w-4 text-white" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none min-h-[640px]">
                    <CardContent className="px-4 py-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="flex items-center gap-2 text-[30px] font-semibold text-[#242a38]">
                                <CalendarDays className="h-4 w-4" />
                                Aujourd'hui - 16 Janvier 2024
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">
                                    Vue Semaine
                                </Button>
                                <Button variant="outline" className="h-8 rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[11px] text-[#4d5567]">
                                    Vue Mois
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {dayEvents.map((event) => (
                                <div key={event.title} className="rounded-[10px] border border-[#e7ebf3] bg-white px-3 py-3">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className="w-[52px] text-right">
                                                <p className="text-[18px] font-semibold text-[#232a38]">{event.time}</p>
                                                <p className="text-[10px] text-[#8a92a3]">{event.duration}</p>
                                            </div>
                                            <div className="mt-0.5 h-10 w-[2px] bg-[#3f7fe8]" />
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-[12px] font-medium text-[#252c3b]">{event.title}</p>
                                                    <Badge className="rounded-full border-0 bg-[#edf0f6] px-2 py-0.5 text-[10px] text-[#3d4354]">
                                                        {event.type}
                                                    </Badge>
                                                </div>
                                                <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#7f8797]">
                                                    <span className="flex items-center gap-1">
                                                        <Video className="h-3.5 w-3.5" />
                                                        {event.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3.5 w-3.5" />
                                                        {event.people}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <Badge className={`rounded-full border-0 px-2 py-0.5 text-[10px] ${event.statusClass}`}>
                                                {event.status}
                                            </Badge>
                                            <p className="mt-2 text-[11px] text-[#4d5567]">Détails</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="px-4 py-4">
                            <h2 className="mb-3 flex items-center gap-2 text-[24px] font-semibold text-[#242a38]">
                                <Clock3 className="h-4 w-4" />
                                Prochains Événements
                            </h2>

                            <div className="space-y-3">
                                {upcoming.map((item) => (
                                    <div key={item.title} className="rounded-lg border border-[#ebeff6] bg-[#f8f9fc] px-3 py-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-[12px] font-medium text-[#2f3647]">{item.title}</p>
                                                <p className="mt-1 text-[10px] text-[#8a92a3]">{item.date}</p>
                                                <p className="text-[10px] text-[#8a92a3]">{item.source}</p>
                                            </div>
                                            <Badge className="rounded-full border border-[#d8dce7] bg-white px-2 py-0.5 text-[10px] text-[#3d4354]">
                                                {item.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="px-4 py-4">
                            <h2 className="mb-3 text-[24px] font-semibold text-[#242a38]">Actions Rapides</h2>
                            <div className="space-y-2">
                                <QuickAction icon={Video} label="Programmer Entretien" />
                                <QuickAction icon={Bell} label="Rappel Automatique" />
                                <QuickAction icon={Calendar} label="Bloquer Créneau" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                        <CardContent className="px-4 py-4">
                            <h2 className="mb-4 text-[24px] font-semibold text-[#242a38]">Statistiques du Jour</h2>
                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div>
                                    <p className="text-[31px] font-semibold text-[#75b629]">5</p>
                                    <p className="text-[10px] text-[#8a92a3]">Entretiens</p>
                                </div>
                                <div>
                                    <p className="text-[31px] font-semibold text-[#2f80ed]">8/12</p>
                                    <p className="text-[10px] text-[#8a92a3]">Événements terminés</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

type QuickActionProps = {
    icon: React.ComponentType<{ className?: string }>
    label: string
}

function QuickAction({ icon: Icon, label }: QuickActionProps) {
    return (
        <Button variant="outline" className="h-9 w-full justify-start rounded-lg border-[#eceff5] bg-[#f8f9fc] px-3 text-[12px] text-[#41495a] hover:bg-[#f1f4fa]">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </Button>
    )
}

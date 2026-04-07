"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { planningService } from "@/lib/services/planning.service"
import type { ICalendarEvent } from "@/lib/@types/entities"
import { Calendar, Clock, Users, TrendingUp, Plus, ChevronLeft, ChevronRight, MapPin, User } from "lucide-react"

export default function Page() {
    const [stats, setStats] = useState({
        todayEvents: 12,
        upcomingSchedules: 5,
        trainingSessions: 3,
        attendanceRate: 82.3,
    })
    const [currentDate] = useState(new Date(2024, 0, 16)) // 16 janvier 2024
    const [events, setEvents] = useState<ICalendarEvent[]>([])
    const [upcomingEvents, setUpcomingEvents] = useState<ICalendarEvent[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, eventsData, upcomingData] = await Promise.all([
                    planningService.getStats(),
                    planningService.getEvents(currentDate.toISOString().split("T")[0]),
                    planningService.getUpcomingEvents(),
                ])

                setStats(statsData)
                setEvents(
                    eventsData || [
                        {
                            id: "1",
                            title: "Entretien RH - Sophie Martin",
                            type: "entretien",
                            startTime: "14:00",
                            endTime: "15:00",
                            participants: ["Sophie Martin", "Marie Dubois"],
                            status: "confirmed",
                            location: "Salle de réunion A",
                        },
                        {
                            id: "2",
                            title: "Session Formation IA - Groupe A",
                            type: "formation",
                            startTime: "16:30",
                            endTime: "18:00",
                            participants: ["Groupe A"],
                            status: "confirmed",
                            location: "Salle de formation",
                        },
                    ],
                )
                setUpcomingEvents(
                    upcomingData || [
                        {
                            id: "3",
                            title: "Workshop Performance Coaching",
                            type: "formation",
                            startTime: "09:00",
                            endTime: "12:00",
                            participants: ["Équipe RH"],
                            status: "pending",
                            location: "Auditorium",
                        },
                        {
                            id: "4",
                            title: "Simulation Entretien - Anna Laurent",
                            type: "entretien",
                            startTime: "14:30",
                            endTime: "15:30",
                            participants: ["Anna Laurent"],
                            status: "confirmed",
                        },
                    ],
                )
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [currentDate])

    const getEventTypeBadge = (type: string) => {
        const variants = {
            entretien: "bg-blue-100 text-blue-800",
            formation: "bg-green-100 text-green-800",
            reunion: "bg-purple-100 text-purple-800",
        }
        return variants[type as keyof typeof variants] || variants.entretien
    }

    const getStatusBadge = (status: string) => {
        const variants = {
            confirmed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            cancelled: "bg-red-100 text-red-800",
        }
        return variants[status as keyof typeof variants] || variants.pending
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64">Chargement...</div>
    }

    return (
        <div className="p-2 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Planification & Agenda</h1>
                    <p className="text-gray-600">Gérez vos entretiens, vos formations et formations</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel Événement
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Événements Aujourd'hui</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.todayEvents}</p>
                                <p className="text-xs text-gray-500">16 janvier 2024</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Prochaines Programmations</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSchedules}</p>
                                <p className="text-xs text-gray-500">Cette semaine</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Sessions Formation</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.trainingSessions}</p>
                                <p className="text-xs text-gray-500">En cours</p>
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
                                <p className="text-sm font-medium text-gray-600">Taux de Présence</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
                                <p className="text-xs text-gray-500">Moyenne mensuelle</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Aujourd'hui - 16 Janvier 2024</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm font-medium">Vue Semaine</span>
                                    <Button variant="outline" size="sm">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm font-medium">Lun Mois</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div key={event.id} className="border rounded-sm p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {event.startTime} - {event.endTime}
                                                        </div>
                                                        {event.location && (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-4 h-4" />
                                                                {event.location}
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-1">
                                                            <User className="w-4 h-4" />
                                                            {event.participants.join(", ")}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <Badge className={getEventTypeBadge(event.type)}>
                                                            {event.type === "entretien"
                                                                ? "Entretien"
                                                                : event.type === "formation"
                                                                    ? "Formation"
                                                                    : "Réunion"}
                                                        </Badge>
                                                        <Badge className={getStatusBadge(event.status)}>
                                                            {event.status === "confirmed"
                                                                ? "Confirmé"
                                                                : event.status === "pending"
                                                                    ? "En attente"
                                                                    : "Annulé"}
                                                        </Badge>
                                                    </div>
                                                </div>
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
                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Prochains Événements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="border rounded-sm p-3">
                                        <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {event.startTime} - {event.endTime}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge className={getEventTypeBadge(event.type)} size="sm">
                                                {event.type === "entretien"
                                                    ? "Entretien"
                                                    : event.type === "formation"
                                                        ? "Formation"
                                                        : "Réunion"}
                                            </Badge>
                                        </div>
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
                        <CardContent>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Programmer Entretien
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Rapport Automatique
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <Users className="w-4 h-4 mr-2" />
                                    Rapport Collectif
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistiques du Jour</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Entretiens réalisés</span>
                                    <span className="text-sm font-medium">8/12</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "67%" }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Formations terminées</span>
                                    <span className="text-sm font-medium">2/3</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "67%" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

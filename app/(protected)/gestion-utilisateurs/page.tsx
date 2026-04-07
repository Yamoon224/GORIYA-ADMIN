"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, UserPlus, Users, Building2, UserCheck, UserX, MoreHorizontal } from "lucide-react"
import { userService } from "@/lib/services/user.service"
import type { IUser } from "@/lib/@types/entities"

export default function Page() {
    const [stats, setStats] = useState<{
        totalUsers: number
        enterprises: number
        activeUsers: number
        newUsers: number
    } | null>(null)
    const [users, setUsers] = useState<IUser[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState<string>("all")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            // Données de démonstration
            setStats({
                totalUsers: 2847,
                enterprises: 186,
                activeUsers: 2654,
                newUsers: 193,
            })

            setUsers([
                {
                    id: "1",
                    name: "Sophie Martin",
                    email: "sophie.martin@email.com",
                    role: "admin",
                    status: "active",
                    registrationDate: "2024-01-15",
                    lastLogin: "2024-01-16T10:30:00Z",
                    references: "Super CV 95/100",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                    id: "2",
                    name: "Marc Dubois",
                    email: "marc.dubois@techcorp.com",
                    role: "enterprise",
                    status: "active",
                    registrationDate: "2024-01-01",
                    lastLogin: "2024-01-16T09:15:00Z",
                    references: "12 offres",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                    id: "3",
                    name: "Julie Durand",
                    email: "julie.durand@email.com",
                    role: "user",
                    status: "inactive",
                    registrationDate: "2024-01-22",
                    references: "Score CV 72/100",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                    id: "4",
                    name: "Vincent SARL",
                    email: "contact@vincent-sarl.com",
                    role: "enterprise",
                    status: "active",
                    registrationDate: "2024-03-10",
                    lastLogin: "2024-01-15T16:45:00Z",
                    references: "8 offres",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
            ])
        } catch (error) {
            console.error("Erreur lors du chargement:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (userId: string, newStatus: "active" | "inactive") => {
        try {
            await userService.updateUserStatus(userId, newStatus as any)
            setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error)
        }
    }

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = roleFilter === "all" || user.role === roleFilter
        return matchesSearch && matchesRole
    })

    if (loading) {
        return <div className="p-6">Chargement...</div>
    }

    return (
        <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
                    <p className="text-gray-600">Administrer tous les comptes utilisateurs de la plateforme</p>
                </div>
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ajouter Utilisateur
                </Button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Utilisateurs</p>
                                <p className="text-2xl font-bold text-blue-600">{stats?.totalUsers.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Entreprises</p>
                                <p className="text-2xl font-bold text-green-600">{stats?.enterprises}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Actifs</p>
                                <p className="text-2xl font-bold text-purple-600">{stats?.activeUsers.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Nouveaux</p>
                                <p className="text-2xl font-bold text-orange-600">{stats?.newUsers}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                                <UserPlus className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filtres et recherche */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Rechercher un utilisateur..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-md"
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les rôles</SelectItem>
                                <SelectItem value="admin">Administrateur</SelectItem>
                                <SelectItem value="user">Utilisateur</SelectItem>
                                <SelectItem value="enterprise">Entreprise</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtres
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Liste des utilisateurs */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Utilisateur</th>
                                    <th className="text-left py-3 px-4">Rôle</th>
                                    <th className="text-left py-3 px-4">Statut</th>
                                    <th className="text-left py-3 px-4">Date d'inscription</th>
                                    <th className="text-left py-3 px-4">Références</th>
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge
                                                variant={
                                                    user.role === "admin" ? "default" : user.role === "enterprise" ? "secondary" : "outline"
                                                }
                                            >
                                                {user.role === "admin"
                                                    ? "Administrateur"
                                                    : user.role === "enterprise"
                                                        ? "Entreprise"
                                                        : "Utilisateur"}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge
                                                variant={user.status === "active" ? "default" : "secondary"}
                                                className={
                                                    user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                }
                                            >
                                                {user.status === "active" ? "Actif" : "Inactif"}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="text-sm">{new Date(user.registrationDate).toLocaleDateString("fr-FR")}</p>
                                                {user.lastLogin && (
                                                    <p className="text-xs text-gray-500">
                                                        Dernière connexion: {new Date(user.lastLogin).toLocaleDateString("fr-FR")}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-sm">{user.references}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                {user.status === "active" ? (
                                                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(user.id, "inactive")}>
                                                        <UserX className="w-4 h-4" />
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(user.id, "active")}>
                                                        <UserCheck className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="outline">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
